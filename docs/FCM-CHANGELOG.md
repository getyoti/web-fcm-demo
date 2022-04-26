# CHANGELOG

## v1.0.0

Now the vanilla version of the Face Capture Module also exports some useful constants, as the React version does. Here is a list of all of them:

- **CAPTURE_METHOD**
- **COUNTDOWN_MODES**
- **ERROR_CODE**
- **FORMAT_TYPE**
- **IMAGE_TYPE**
- **LANGUAGE_CODE**
- **QUALITY_TYPE**
- **RESOLUTION_TYPE**

New constants can be accessed by using `Yoti.<CONSTANT_NAME>`.

## v1.0.0-beta.3

Fix a package install error which cause `yarn` and older `npm` versions to fail.

## v1.0.0-beta.2

### New features

- Capture secure mode.
- Vanilla version reload.
- New FCM Design.
- New optional "consent" button.
- Default captureMethod changed from "Manual" to "Auto".

### Breaking changes

Now the `onSuccess` callback returns the image in the `img` field instead for
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

Now the `CustomButton` has been splited in `CustomManualButton` and `CustomConsentButton` because
of the implementation of the new consent mode. Each of the properties has the same definitions as
the old `CustomButton`, funtions using `onClick` and `disabled` as props that returns a button
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
  - `uk`: Ukranian

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
- Set JPEG High quality as default image format
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
