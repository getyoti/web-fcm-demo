# CHANGELOG

## v2.7.0

### New features

#### Multiframe

Multiframe is a new layer of protection added on top of the curren security features that further improves virtual injection detection.

- Adds a new prop `multiframe` to enable and disable this features. (Default:false)
- The new `multiframe`mode, only works with the `secure` mode and needs the query param `multiframe=true` added to the prediction request.
- Enabling `multiframe` will increase the payload size.
- When enabling`multiframe`, the following property values will be ignored and handled internally for optimal performance:
  - `format`
  - `resolutionType`
  - `qualityType`
  - `imageType`
  - `allowBackgroundFaces`

#### Others

- Adds a new prop `sessionDuration` which specifies the maximum duration of the session before it times out, regardless of number of retry attempts.
  - The value must be within 30s and 5m (in milliseconds), and invalid values will trigger an exception.
- The icon for the multiple faces feedback was changed.
- `a11yLiveRegionMode` is now deprecated and will be removed in the next major release. Accessibility features like `aria-live` are now handled internally.

### Fixes

- The feedback message is centred so the possibility of overlap with the face layout has been reduced.
- Localisation has been revised. The following languages have been updated:
  - `bs-BA`: Bosnian
  - `sr-RS`: Serbian (Latin script)

## v2.6.2

### Fixes

- Fixed a bug where the `onSuccess` callback was not called on some iOS versions.

### New features

- Add new localisations:
  - `bs-BA`: Bosnian
  - `sr-RS`: Serbian (Latin script)

## v2.6.1

### Fixes

- Fixed a bug causing the module to expand in height before capturing the image.
- Improve containment for layout isolation, preventing CSS leakage.
- Increase the default `loadTimeout` value from 15000 to 60000 ms.
- Fixed `loadTimeout` documentation definition.

#### Peer dependencies updates

- Updated `axios` dependency from `1.6.5` to `1.8.4`.

## v2.6.0

### New features

#### Theming

- Improved theming capabilities:
  - General theming capabilities have been added through CSS variables:
    - `--fcm-background-color` Sets the background color.
    - `--fcm-background-color-variant1` Variant 1 of the background color.
    - `--fcm-background-color-variant2` Variant 2 of the background color.
    - `--fcm-background-color-contrast` Color used for contrast elements like separators or the dialog scrollbar.
    - `--fcm-button-color` Color used for the buttons.
    - `--fcm-button-color-hover` Color used for the buttons when hovered.
    - `--fcm-button-color-press` Color used for the buttons when pressed.
    - `--fcm-text-color-primary` Color used for the primary text.
    - `--fcm-text-color-secondary` Color used for the secondary text.
    - `--fcm-font-family` Sets the font family.
  - Previous css variables to style the FCM have been deprecated, they are still applied but will get removed in future versions.
    - `--fcm-primary-button-background-color`
    - `--fcm-primary-button-background-color-hover`
    - `--fcm-primary-button-text-color`
    - `--fcm-secondary-button-background-color`
    - `--fcm-secondary-button-text-color`
    - `--fcm-secondary-button-text-color-hover`
    - `--fcm-prompt-text-color`
    - `--fcm-prompt-background-color`
  - More extensive theming solutions are also possible. Contact with Yoti for more information about this.

#### UI/UX

- Improved accuracy of certain error states representation
  - Replaced a misleading `Please connect to the Internet` screen with a `Sorry, there was a problem while loading` one which better describes the nature of the encountered error
- Improved help dialog UI
  - Added border-radius to images.
  - Centered video.
- Improved Area Mode face detection method making the face capture process easier.
- Added new user feedback to Area Mode face detection:
  - "Move your face lower"
  - "Move your face higher"
- Added a new message to the loading view to better represent the state of the FCM.
  - "Running security checks"
- The `Processing your photo` screen is now displayed for at least 1.5 seconds after capturing the image to avoid flash-like effects.

#### Others

- Added a new property `luminosityCheckLevel`, allowing integrators to adjust the strictness of luminosity
  validation with more flexible configuration options. Note: This feature is designed for retail terminals
  and unsuitable for online user's face capture.
- Added a 20-second timeout to avoid long wait times when the network connection is poor or unavailable.

### Fixes

- Fixed bug causing the Face overlay to be out of position when specific CSS was applied to the FCM.
- Fixed an issue where the module layout would break when rotating an iPad.
- Fixed an overlapping issue for some loading screens.
- Fixed an issue where integrators could set an invalid `numStableFrames` value for non-secure requests.

### Notices

- Localisation has been revised. The following languages have been updated:
  - ar-XN
  - bg-BG
  - cs-CZ
  - es-ES
  - fa-IR
  - fi-FI
  - fr-FR
  - he-IL
  - hi-IN
  - hu-HU
  - hy-AM
  - id-ID
  - ja-JP
  - ko-KR
  - lv-LV
  - ms-MY
  - nb-NO
  - pl-PL
  - ro-RO
  - ru-RU
  - sk-SK
  - sv-SE
  - th-TH
  - tl-PH
  - tr-TR
  - uk-UA
  - vi-VN
  - zh-CN

## v2.5.1

### New features

- Made the `FaceCapture` component load faster.
  - The time reduction is most noticeable on devices that were particularly slow
    in previous versions.

### Fixes

- Fixed the bottom margin of the manual capture button in landscape mode.

## v2.5.0

### New features

- Further enhancements to secure capture and injection attack detection.

### Fixes

- Made the camera load faster.
- Fixed an issue where loading timeout would not trigger under specific circumstances.
- Fixed a small misalignment with the icon in the user feedback.

## v2.4.0

### New features

- Further enhancements to secure capture and injection attack detection.

### Fixes

- Fix distorted layout on iOS devices.

## v2.3.2

### New features

- Add the new _experimental_ property `isScoPortraitCamera` to adapt the module
  to camera streams with a portrait resolution in SCO (self-checkout) machines.

## v2.3.1

### Fixes

Fixed an issue introduced in v2.3.0 causing the `numStableFrames` property to be marked as mandatory in the module typing.

## v2.3.0

### Notices

- Localisation has been thoroughly revised. All languages have been updated to improve correctness and punctuation.
- Reduce the number of retries to 3 for some errors so that the onError is triggered earlier.

### New features

- Add new property `numStableFrames` to determine how many frames are used for the stability check.
  The minimum value is 3 and the maximum is 6.
- Implemented localisation language:
  - `hr-HR`: Croatian

### Fixes

- Fix text position and margin on initial guidance for large languages.

## v2.2.1

### Notices

- Improved face validations performance, resulting in faster image captures.
- Improved face stability validation. Now it is easier to capture the image.

### Fixes

- Fixed a bug causing undesired triggers of the `onError` callback when
  `userRetryError` was set to `false`.
- A note for `userRetryError` property has been added in [`2.0.1-beta.1`](#v200-beta1) in the breaking changes section.
- `Right-to-left` language localisations now use the proper alignment.
- Fix wrong translation for "Move to the center" message for Portuguese (Brazil).

## v2.2.0

### New features

- New capture mode:

  - Additional `allowBackgroundFaces` configuration property that allows faces
    to be present in the background when the image is being captured. The face
    capture will return a cropped image with the main face when set to `true`.
    Note: This feature is designed for retail terminals and unsuitable for
    online user's face capture.
  - Additional `faceSelectionMethod` configuration property to select where the
    main face can be placed, in the center or anywhere in the image. Note: This
    feature is designed for retail terminals and unsuitable for online user's
    face capture.

  **Note:** It is recommend to enable `allowBackgroundFaces` when `faceSelectionMethod` is set to `area`.

- User feedback added and localized for the new `faceSelectionMethod`.

### Fixes

- Recalibration on the face validations order to improve the user experience
  when capturing the face in challenging light conditions.

## v2.1.0

### New features

- Improve security checks.
- UI improvements on help dialogue.
- Change feedback message for `OVERCONSTRAINED` and `NO_CAMERA` errors from
  `Please try again` to `Please try using a different device`.

### Fixes

- Remove the duplication of `Preparing camera` message when the FCM loads.
- Fix video layout bug on iOS's 17.X version.
- Improve the `scale` feature to fit better the whole container when the FCM is
  scaled.
- Mute Help dialogue video stream.
- Adjust the distribution of icons and text of `Help` to avoid visual bugs
  in certain languages.

#### Peer dependencies updates

- Update `axios` dependency from `1.6.2` to `1.6.5`.

## v2.0.0

See section [v2.0.0-beta.1](#v200-beta1) with previous changes for version
`2.0.0`.

- Design:

  - The minimum size for the Face Capture in landscape view is 527px.

  - Improved the help dialogue UI.

- Updated Tagalog localisation message for "Only one face allowed" feedback.

### Fixes

- Apply portrait or landscape custom styles when the user rotates the device.
- Fix scale flick when the `FaceCapture` loads.
- Solve Axios dependency CSRF vulnerability.

## v2.0.0-beta.1

### New features

- The secure mode returns an encrypted image by default now. Use `encryptImage`
  property to return the base64 image in the secure payload. The face capture
  also provides a new property to get the base64 image preview in the `onSuccess`
  callback: `returnPreviewImage`.

- New property to identify your Yoti Hub application: `clientSdkId`.

- Secure module deprecation and end support handling.

  - The Face Capture will log a warning message when the secure module version in use
    becomes deprecated. It will return the error `VERSION_NO_LONGER_AVAILABLE`
    in the `onError` callback when the support has ended.

- New property to allow auto-reload of the secure session before the session expires: `autoSessionReload`.

- New property to let the user handle errors by retrying several times: `userRetryError`. It is enabled by default.

- New design:

  - The Face Capture will show a loading screen when it returns a valid
    image in the `onSuccess` callback or an error screen if it runs the
    `onError` callback.

  - New Guidance screen that will be shown before the webcam loads. It can be hidden by providing the property `showInitialGuidance` with value `false`

  - New Get Help button in the webcam view. It can be hidden by providing the property `showGetHelpButton` with value `false`.

  - New font family (it can still be changed by `--fcm-font-family` css
    variable).

  - Improved manual mode user feedback.

  - Improved Face Capture responsiveness.

  - It is possible to customize some styles by using css variables. These are
    the properties that can be changed:

    - `--fcm-primary-button-background-color` changes the background color in
      primary buttons (Take picture, Try again, ... ).
    - `--fcm-primary-button-background-color-hover` changes the background
      color in primary buttons (Take picture, Try again, ... ) when is hovered.
    - `--fcm-primary-button-text-color` changes the text color in primary
      buttons (Take picture, Try again, ... ).
    - `--fcm-secondary-button-background-color` changes the background color in
      primary buttons (Get help).
    - `--fcm-secondary-button-text-color` changes the text color in secondary
      buttons (Get help).
    - `--fcm-secondary-button-text-color-hover` changes the text color in
      secondary buttons (Get help) when the button is hovered.
    - `--fcm-prompt-text-color` changes the text color in the prompt.

  - The countdown functionality has been removed.

- Implemented localisation languages:

  - `tl-PH`: Tagalog
  - `zh-CN`: Chinese - Simplified

- The Face Capture style has been encapsulated using shadow Dom. From now on, the only style customization available is through the CSS variables listed in the documentation.

### Breaking changes

- The `onSuccess` callback definition changed to (`(payload: FCMPayload, base64PreviewImage?: string) => {}`).

  - The type of the `payload` argument changed from `FCMResult` to `FCMPayload`.

- Secure mode is now the default mode for the Face Capture (`secure` property value is now `true` by default).

  - The new property `clientSdkId` is required when using secure mode. So will be required by default.

- The property `buttonSize` was removed.

- The property `isConsentRequired` was removed.

- The properties `CustomManualButton` and `CustomConsentButton` were removed.

- The property `countdownMode` was removed.

- The minimum size for the Face Capture in landscape view is 576px.

- As the `userRetryError` is set to true by default, the `onError` will not be triggered until the user runs out of tries.

#### Peer dependencies updates

- Updated `react` dependency version to be at least `16.14.0` and a maximum of `18.2.0`.

- Updated `react-dom` dependency version to be at least `16.14.0` and a maximum of `18.2.0`.

## v1.4.0

### New features

- If the module takes more than 15 seconds to be downloaded, the onError callback will be called with error code `EXCEEDED_TIME_TO_LOAD`. You can modify the timeout to call `onError` by changing the `loadTimeout` property.
- Implemented localisation languages:

  - `sk-SK`: Slovak
  - `hu-HU`: Hungarian

- The translations are available for the manual button.

- It is possible to change the default button size. There are three options: SMALL, MEDIUM and LARGE. The new field, `buttonSize`, can be used for changing the button size: `buttonSize={BUTTON_SIZE.SMALL}`.
  MEDIUM and LARGE values are not supported in mobile devices

- It is possible to change some values by css variables. These are the properties that can be changed:

  - --fcm-button-color-background. Changes the background color in buttons.
  - --fcm-button-text-color. Changes the text color in buttons.
  - --fcm-button-background-color-hover. Changes the background color for buttons on hover.
  - --fcm-button-background-color-disabled. Changes the background color for buttons when they are disabled.
  - --fcm-font-family. Sets the font family.
  - --fcm-prompt-background-color. Sets the background color in the message prompt.

  > **Note**: We do not recommend changing these css properties, all changes on the font and colors are under the integrator's responsibility and need to be tested by the integrator.
  > In addition, we can't guarantee external customizations support on new versions of the library

### Notices

- `CustomManualButton` and `CustomConsentButton` are deprecated. They will be removed on 2.0.0 version.
- Region subtag added to localisation tags. Codes with a single primary subtag (e.g.`en`) are still valid, although we encourage using region-variant codes explicitly.
  - `ar` --> `ar-XN`
  - `cs` --> `cs-CZ`
  - `da` --> `da-DK`
  - `de` --> `de-DE`
  - `el` --> `el-GR`
  - `en` --> `en-GB`
  - `es` --> `es-ES`
  - `et` --> `et-EE`
  - `fi` --> `fi-FI`
  - `fr` --> `fr-FR`
  - `he` --> `he-IL`
  - `hi` --> `hi-IN`
  - `hy` --> `hy-AM`
  - `id` --> `id-ID`
  - `it` --> `it-IT`
  - `ja` --> `ja-JP`
  - `ko` --> `ko-KR`
  - `lt` --> `lt-LT`
  - `lv` --> `lv-LV`
  - `ms` --> `ms-MY`
  - `nb` --> `nb-NO`
  - `nl` --> `nl-NL`
  - `pl` --> `pl-PL`
  - `ro` --> `ro-RO`
  - `ru` --> `ru-RU`
  - `sv` --> `sv-SE`
  - `th` --> `th-TH`
  - `tr` --> `tr-TR`
  - `uk` --> `uk-UA`
  - `ur` --> `ur-PK`
  - `vi` --> `vi-VN`

### Fixes

- Fix Greek localisation for "Place your face in the frame" feedback.

## v1.3.0

### New features

- The secure payload has a new field `verification`.
- Increased protection against requests from untrusted devices. The
  malicious and suspicious requests will return a new error code
  `UNTRUSTED_SECURE_SESSION`.
- The `manualCaptureFallback` time has been increased to 10 seconds.
- Implemented localisation languages:

  - `BG-bg`: Bulgarian
  - `fa-IR`: Persian
  - `pt-BR`: Portuguese (Brazil)
    - `pt` and `pt-BR` are both Brazilian. `pt` is now deprecated and it will be
      removed on future releases.
  - `pt-PT`: Portuguese (Portugal)

### Fixes

- Secure session initialisation request is no longer cached.
- Added missing fields in the typing file.
- Camera feedback messages are shown only after the camera permissions were
  giving not before.

## v1.2.0

### New features

- Added two new error codes:

  - `SECURE_SESSION_EXPIRED` is thrown when the secure session token has expired.
  - `VIDEO_STREAM_INTERRUPTED` is thrown when the camera connection is lost after reaching the ready state.

- Implemented localisation languages:

  - `el`: Greek

- Improve secure mode checks.

- Fix the error when the FCM component is unmounted if it uses the secure mode.

- Use the new Yoti colors for the button and overlay feedback.

## v1.1.0

### New features

- New way to sign the `onSuccess` result in the secure mode.

### Fixes

- `faceCaptureAssetsRootUrl` is no longer typed as a required prop.

## v1.0.0

### New features

- Removed `widthMinConstraint` and `widthIdealConstraint` from the Face Capture Module props.

- Added `resolutionType` prop to provide a semantic and easier way of selecting the desired resolution.
  The possible values for the new prop are:

  - `hd`
  - `full_hd`

- Added `onReadyForCapture` callback to provide a way for the integrators to know when the module is ready to take images.

- Now, the Face Capture Module will stop the process and the camera when the page is hidden.

  - There is a known issue on iPhone Firefox when opening a new FCM instance in a different tab, that may cause the previous one to freeze.

- Now, the vanilla version of the Face Capture Module also exports some useful constants, as the React version does. Here is a list of all of them:

  - **CAPTURE_METHOD**
  - **COUNTDOWN_MODES**
  - **ERROR_CODE**
  - **FORMAT_TYPE**
  - **IMAGE_TYPE**
  - **LANGUAGE_CODE**
  - **QUALITY_TYPE**
  - **RESOLUTION_TYPE**

    New constants can be accessed by using `Yoti.<CONSTANT_NAME>`.

- Now, `countdownMode` has new options:

  - `never` and `always` remains the same.
  - `auto` has been replaced by `only_mobile` and `only_desktop` which brings extra configuration for all possible scenarios.

- Implemented localisation languages:

  - `ur`: Urdu
  - `hy`: Armenian
  - `he`: Hebrew

- Updated localisation languages:

  - `it`: Italian
  - `es-419`: Latin American Spanish

- Fixed typo in German localisation.

- Manual capture method fallback when slow performance, is now optional with the new `manualCaptureFallback` prop.

- Added type declaration file `index.d.ts` for the Face Capture component and exported properties.

- CustomManualButton and CustomConsentButton properties are not supported in the vanilla version.

### Minor changes

- Removed ellipsis from user feedback messages.

### Fixes

- Fix error added on `FCM 1.0.0-beta.2` causing `JPEG` images to be more compressed than desired on landscape scenario.

## v1.0.0-beta.3

Fix a package install error which causes `yarn` and older `npm` versions to fail.

## v1.0.0-beta.2

### New features

- Capture secure mode.
- Vanilla version reload.
- New FCM Design.
- New optional "consent" button.
- Default captureMethod changed from "Manual" to "Auto".

### Breaking changes

Now, the `onSuccess` callback returns the image in the `img` field instead of
`image`.

- Before:

  ```json
  {
    "image": "<base64_img>"
  }
  ```

- After:

  - No secure:

    ```json
    {
      "img": "<base64_img>"
    }
    ```

  - Secure:

    ```json
    {
      "img": "<base64_img>",
      "secure": {
        "version": "<fcm_version>",
        "token": "<session_token>",
        "signature": "<result_signature>"
      }
    }
    ```

Now, the `CustomButton` has been split into `CustomManualButton` and `CustomConsentButton` because
of the implementation of the new consent mode. Each of the properties has the same definitions as
the old `CustomButton`, functions using `onClick` and `disabled` as props that return a button
component.

## v0.6.0

### New features

- Implemented localisation languages
  - `ar`: Arabic
  - `lv`: Latvian

## v0.5.0

### New features

- Implemented localisation languages
  - `et`: Estonian
  - `id`: Bahasa
  - `ko`: Korean
  - `lt`: Lithuanian
  - `ms`: Malay
  - `uk`: Ukrainian

## v0.4.0

### New features

- Implemented Face capture module vanilla, to run our module without react stack application
- Implemented brightness validation to stop images too dark or too bright
- Implemented localisation languages
  - `cs`: Czech
  - `da`: Danish
  - `de`: German
  - `fi`: Finnish
  - `hi`: Hindi
  - `it`: Italian
  - `ja`: Japanese
  - `nb`: Norwegian
  - `nl`: Dutch
  - `pl`: Polish
  - `pt`: Portuguese
  - `ro`: Romanian
  - `ru`: Russian
  - `sv`: Swedish
  - `th`: Thai
  - `tr`: Turkish
  - `vi`: Vietnamese

## v0.3.1

### New features

- Image payload optimisation on Horizontal images by removing unused image edges.

## v0.3.0

### New features

- Export error codes and component properties values constants

### Fixes

- Fix feedback message when the user is too close to the camera

- Fix state warning after component mounting

## v0.2.0

### New features

- Add language support fallback

### Fixes

- Fix typos in Spanish, Latin Spanish and Italian localisations
- Fix assets configuration in integrators.md

## v0.1.0

### New Features

- Add image quality prop
- Set JPEG High quality as the default image format
- Add languages support:

  - EN - English
  - DE - German
  - ES - Spanish
  - ES-419 Latin Spanish
  - FR - French
  - IT - Italian

- Browser support:
  | Browser | Versions |
  | ------- | ----------------- |
  | and_chr | 86 |
  | chrome | 86,85,84,83 |
  | edge | 86,85 |
  | firefox | 82,81,80,79 |
  | ios_saf | 14,13.4-13.7,13.3 |
  | safari | 14,13.1,13,12.1 |

### Fixes

- Fix Manual mode Capture Bug
- Fix Android 11 Chrome freeze bug
- Fix Storybook endpoints

## v0.1.0-beta.1

### New Features

- Update TinyFace image validation values
- imageType prop with `original | cropped`
- Add initial delay to the Auto Capture Flow
- Update face size deviation
- Update bbox relative size deviation
- Increase ideal width constraint
