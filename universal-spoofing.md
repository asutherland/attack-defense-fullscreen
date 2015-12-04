# Attack: Universal Spoofing #

The primary benefit of a fullscreen attack is that it allows the attacker to be
in full control of the UI the user experiences, including the ability to
simulate (or spoof) normally trustworthy user affordances such as the location
bar to make the user think they are interacting with something trustworthy, or
at least something different, while they are still interacting with the
attacker.

The intent of such attacks could be one of many:
* Convincing the user to reveal a secret that the attacker may leverage, such
  as a password.
* Convincing the user to take an action desired by the attacker outside of the
  context controlled by the attacker.  For example, a computer problem or
  legitimate notification could be simulated to convince the user to make a
  phone call, do something on a legitimate web site, etc.
  * This includes convincing the user that something that could not occur via
    the spoofing attack has occurred and therefore the user needs to take some
    real counter-action.
* Prime the user for a social engineering attack via alternate channel.  For
  example, convince the user that the phone call they next receive is really
  from their bank.

## Defense: Diverse Trusted UIs ##

A successful attack relies on the attacker being able to successfully imitate
a UI experience that conforms to the expectations of the user.  Note that this
is not the same thing as being able to faithfully emulate the actual UI of the
platform being used.

### Attack: User Confusion ###

The more systems a user interacts with different security idioms and patterns,
the more likely they are to believe an attacker-controlled UI is just yet
another legitimate but varying UI.

### Attack: Platform Fingerprinting ###

By consulting the user-agent and otherwise fingerpringint the browser runtime,
an attacker may be able to identify the platform in use and the appropriate UI
to imitate.  In the event the given UI is not supported, the attacker may
decide to either not attack the given user, or to risk the user noticing the
attack in the hope that User Confusion allows the attack to succeed.

### Defense: User Theming ###

The ability of users to theme their experience in a way that is not exposed to
attackers affords a level of protection.

## Defense: Pop-up Notification of Transition to Full Screen ##

By displaying a pop-up when a webpage transitions to full-screen, the user is
made aware of the switch to a full-screen mode of display.  Use of a pop-up
allows any existing content that was being displayed in a smaller region to
continue playing without interruption.

### Attack: Initiate Fullscreen When User Not Paying Attention ###

If the attacker can initiate fullscreen mode when the user seems idle, the user
may miss the pop-up.

#### Defense: Require Evidence of User Attention to Initiate Full-Screen ####

By requiring a current, active action by the user to initiate full-screen, it
is ensured that the user is actively using the device.

#### Defense: Require Explicit User Action to Confirm Full-Screen Mode ####

If the pop-up does not go away until the user acknowledges it, we can be sure
the user is aware they are in full-screen mode.  Unfortunately this can be very
annoying for the user.

##### Defense: Allow Persisting Permission for Page/Origin #####

If we provide a checkbox on the modal UI or eventually infer that the page
and/or origin is trustworthy, we can stop having the UI be modal.

###### Attack: Leverage Existing Trusted Site Permissions ######

If an attacker can expect some sites to have persisted permissions that make a
spoofing attempt more likely to succeed, they may attempt to gain access to
these permissions.

####### Attack: Man-in-the-Middle Insecure Connections #######

######## Defense: Only Persist Permissions for HTTPS ########

####### Attack: Hack the Trusted Site #######

If an attacker is able to insert content under their control via direct control
or XSS attacks against the site, they may be able to leverage the permission
for eased attack.

### Attack: Distract the User While Initiating Full-Screen ###

If the attacker has control over the portion of the screen that does not
contain the pop-up, which is expected so that continuity of videos can be
maintained, they have the potential to try and distract the user or otherwise
focus their attention so they do not notice the pop-up.

#### Defense: Ensure Size and Animate ####

While there are trade-offs between security and annoying the user, as long as
the pop-up has sufficient area relative to the display size and the expected
user field of view, and animation is used to ensure it is noticed, things
should be fine.

#### Reuse: Require Explicit User Action to Confirm Full-Screen Mode ####

### Attack: Simulated Exit of Fullscreen ###

The eternal "did I really wake up from the dream?" issue.  If the attacker can
convince the user that the system has automatically exited full-screen or that
a system pop-up can overlay the full-screen display, then they may be able to
convince the user to 

### Defense: Persistent Non-distracting Overlay ###

By placing a persistent but non-distracting overlay on the screen that is not
present when the browser is in full control, the user is ideally able to
understand when fullscreen is active.  For example, forcing the top row(s) of
pixels on the screen to be gray, sufficient that it is clear the row is not
part of the bezel of the display.

The primary tradeoff is the potential loss of immersion of the fullscreen
application.  However, by carefully choosing the overlay, some applications may
not be meaningfully affected (ex: widescreen movies that have some degree of
letterboxing active), or may be able to integrate the expected overlay into
their UI.

### Defense: Require Escape Action Prior to Dangerous Actions ###

Assuming the existence of an escape action, requiring the user to trigger the
action before doing anything potentially dangerous ensures that they have
actually exited fullscreen mode.  This is analogous to the Windows OS adopting
"ctrl-alt-del" as the key chord required to login and making it a combination
that applications could not intercept.

#### Attack: Web Pages Do Not Require Escape Actions ####

Unfortunately, all existing web interaction paradigms do not require the user
to perform an escape action, nor is there any API for websites to tell the
browser the user is about to do something dangerous to help train users to
perform this action.

## Defense: Consistent Non-Overridable Escape Action ##

By standardizing actions such as having the escape key or a swipe-down-from-top
gesture that cannot be consumed by the webpage, the user can ensure that they
have left full-screen.

### Reuse: Simulate Exit of Fullscreen ###

## Defense: Consistent, Conditional Display of URL/Origin ##

By providing an affordance to cause the URL/Origin to be displayed, the user
can be reminded that they are in fullscreen and be reminded of what origin is
controlling their fullscreen experience.

The problem and tradeoff here is that fullscreen mode can enable a wide variety
of different usage patterns and users will quickly become frustrated if the
origin is displayed when they do not want to see it.

### Attack: Spoof Scenario That Avoids Triggering Origin Display ###

Like the escape action, the origin display action is only useful if the user
thinks to use it or would normally perform that action during the course of
normal use.

#### Reuse: Simulated Exit of Fullscreen ####

### Defense: Different Fullscreen Modes and Triggers for Interactive and Noninteractive Use ###

The interaction patterns of fullscreen can be broken up into two cases:
1. Passive, non-interactive: Watching a video/movie/etc.
2. Active, interactive: Playing a video game.

The passive mode could be made to display no persistent overlay, but to cause
the origin to be displayed on mouse-movement/mouse-activity.

The active mode could be made to display a persistent overlay with origin
display on "edge pressure" where the mouse is moved to the top of the screen
and attempted to move beyond it, or left to rest at the edge of the screen
temporarily.

## Attack: Clickjacking via Controlled Exit ##

While clickjacking is not a new problem, the fullscreen API introduces new
potential attack vectors since it allows the attacker to control when the
fullscreen API is exited and the mouse may now find itself over portions of the
screen that correspond to browser chrome or OS chrome.

Additionally, an active fullscreen display can help an attacker potentially
manipulate system and browser state much like a magician can do all kinds of
tricky stuff behind a curtain.  For example:

* Opening a website to be clickjacked in another tab, then closing fullscreen
  mode and the attacker tab (using window.close()) once a sufficient duration
  has elapsed to be sure the website has fully loaded.  The additional nuance
  of fullscreen here is that if fullscreen were not active, the user might
  potentially notice the new tab.

### Defense: Temporarily Eat User Clicks On Fullscreen Close ###

Determine the amount of time it takes for a user to notice that fullscreen mode
has closed and eat their clicks during that duration.  This might be
accomplished by animating the close of fullscreen mode while still holding GUI
full-screen mode active so that clicks outside the browser window can still be
consumed.

### Defense: Foreground Browser and Force Safe Mouse Position on Fullscreen Close ###

When the fullscreen mode is closed, force the browser to the the topmost app
and the mouse to be located inside the content area of the page that had
launched fullscreen mode so that existing clickjack protections are in play and
OS chrome or other applications cannot be impacted.

### Defense: Ensure Full-Screen Pages Cannot Trigger UI-Impacting Actions ###

Ensure that any APIs that would cause chrome-level or OS-level actions such as
installing an extension or launching an application are inhibited while
fullscreen mode is active.
