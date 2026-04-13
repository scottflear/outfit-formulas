# Outfit Formulas - Supabase Integration PRD

## For: iOS Development Team
## Priority: High
## Estimated effort: 2-3 hours

---

## Summary

Add Supabase as a data layer alongside Firebase and Amplitude. Every user profile and every user action gets mirrored to Supabase so the marketing/email team can build personalised behavioral emails without any further dev work.

This is a one-time integration. Once shipped, the marketing team operates independently.

---

## What to install

```bash
# Swift Package Manager
# Add: https://github.com/supabase-community/supabase-swift
```

Or if using React Native:
```bash
npm install @supabase/supabase-js
```

---

## Supabase credentials

```
URL: https://wqxrprbabzauermasruk.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHJwcmJhYnphdWVybWFzcnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTI3MzcsImV4cCI6MjA4OTkyODczN30.JjIQoei5Az5frVKtMRrRaAPLUbBVanzRZ3NNCmJymNM
```

Store these in your config/environment. NOT used for auth. Only for data writes.

---

## Task 1: Mirror every Amplitude event to Supabase

### The simplest approach

Wrap your existing Amplitude `track()` call so every event also writes to Supabase. One wrapper function, covers everything.

```swift
// Swift example
func trackEvent(_ name: String, properties: [String: Any] = [:]) {
    // Existing Amplitude tracking (keep as-is)
    Amplitude.instance().logEvent(name, withEventProperties: properties)

    // Mirror to Supabase (fire and forget, non-blocking)
    Task {
        try? await supabase.from("user_activity").insert([
            "user_id": currentUser?.uid ?? "anonymous",
            "email": currentUser?.email ?? "",
            "event_type": name,
            "properties": properties
        ])
    }
}
```

```js
// React Native / JS example
const originalTrack = amplitude.track.bind(amplitude);
amplitude.track = (eventName, properties) => {
    originalTrack(eventName, properties);
    supabase.from('user_activity').insert({
        user_id: auth.currentUser?.uid || 'anonymous',
        email: auth.currentUser?.email || '',
        event_type: eventName,
        properties: properties || {},
    }).then(() => {}).catch(() => {});  // fire and forget
};
```

### Important
- This must be non-blocking. Do NOT await the Supabase call in the main UI thread.
- If the Supabase write fails, ignore it silently. It must never affect the user experience.
- The `user_id` should be the Firebase UID.

---

## Task 2: Write user profile on signup and onboarding completion

### On signup (after Firebase auth completes)

```js
await supabase.from('user_profiles').upsert({
    user_id: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || '',
    is_premium: false,
    onboarding_completed: false,
    last_active: new Date().toISOString(),
}, { onConflict: 'user_id' });
```

### On onboarding completion (after the "I'm In" screen)

```js
await supabase.from('user_profiles').upsert({
    user_id: firebaseUser.uid,
    email: firebaseUser.email,
    name: userName,
    body_type: answers.bodyType || null,
    color_season: answers.colorSeason || null,
    goals: answers.goals || [],
    dressing_feel: answers.dressingFeel || [],
    wardrobe_usage: answers.wardrobeUsage || null,
    monthly_spend: answers.monthlySpend || null,
    shopping_habit: answers.shoppingHabit || null,
    typical_week: answers.typicalWeek || [],
    work_dress_codes: answers.workDressCodes || [],
    wardrobe_pace: answers.wardrobePace || null,
    onboarding_completed: true,
    last_active: new Date().toISOString(),
}, { onConflict: 'user_id' });
```

### On subscription change (trial start, purchase, cancel)

```js
await supabase.from('user_profiles').update({
    is_premium: isPremium,
    trial_started_at: trialStartDate || null,
}).eq('user_id', firebaseUser.uid);
```

---

## Task 3: Update last_active on every app open

```js
// In your app launch / resume handler
supabase.from('user_profiles')
    .update({ last_active: new Date().toISOString() })
    .eq('user_id', firebaseUser.uid)
    .then(() => {}).catch(() => {});  // fire and forget
```

---

## Tables (already created in Supabase)

### user_profiles
| Column | Type | Notes |
|--------|------|-------|
| user_id | TEXT (unique) | Firebase UID |
| email | TEXT | User's email |
| name | TEXT | Display name |
| body_type | TEXT | From onboarding (triangle, hourglass, etc.) |
| color_season | TEXT | From onboarding (spring, summer, etc.) |
| goals | TEXT[] | Array of goal IDs |
| dressing_feel | TEXT[] | Array of struggle IDs |
| wardrobe_usage | TEXT | about_20, maybe_50, almost_everything |
| monthly_spend | TEXT | under_50, 50_150, 150_300, 300_plus |
| shopping_habit | TEXT | event_panic, sale_trap, etc. |
| typical_week | TEXT[] | Array of activity IDs |
| work_dress_codes | TEXT[] | Array of dress code IDs |
| wardrobe_pace | TEXT | monthly_refresh, seasonal_overhaul, slow_steady |
| is_premium | BOOLEAN | Current subscription status |
| trial_started_at | TIMESTAMP | When trial began |
| onboarding_completed | BOOLEAN | Has completed onboarding |
| last_active | TIMESTAMP | Last app open |

### user_activity
| Column | Type | Notes |
|--------|------|-------|
| user_id | TEXT | Firebase UID |
| email | TEXT | User's email |
| event_type | TEXT | Same name as Amplitude event |
| properties | JSONB | Same properties as Amplitude event |
| created_at | TIMESTAMP | Auto-set |

---

## What NOT to do

- Do NOT use Supabase for authentication. Firebase handles that.
- Do NOT read from Supabase in the app. It is write-only from the app's perspective.
- Do NOT block the UI on Supabase writes. All writes are fire-and-forget.
- Do NOT change any existing Amplitude tracking. This is additive.

---

## Testing

After implementing, open the app, complete onboarding, and check the Supabase Dashboard:
- Table Editor > user_profiles: should see your test user with all onboarding answers
- Table Editor > user_activity: should see every event you triggered

---

## Questions?

Contact Scott. The tables are already created. You just need to write to them.
