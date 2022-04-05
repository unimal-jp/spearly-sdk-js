# @spearly/sdk-js

[![Spec Test](https://github.com/unimal-jp/spearly-sdk-js/actions/workflows/spec.yml/badge.svg)](https://github.com/unimal-jp/spearly-sdk-js/actions/workflows/spec.yml)

It is a Development Kit that makes it easy to use Spearly CMS from JavaScript or NodeJS in API mode.

## Getting Started

### Install

```
// npm
$ npm install -S @spearly/sdk-js

// yarn
$ yarn add @spearly/sdk-js
```

## Usage

### Setup

```js
import { SpearlyApiClient } from '@spearly/sdk-js'

const apiClient = new SpearlyApiClient(SPEARLY_DOMAIN, API_KEY)
```

### Get Content Lists

```js
async function() {
  // basic
  const contents =  await apiClient.getList(CONTENT_TYPE_ID)

  // when using some options
  const filteredContents =  await apiClient.getList(CONTENT_TYPE_ID, { limit: 10, offset: 20 })
}
```

### Get Content

```js
async function() {
  const content = await apiClient.getContent(CONTENT_ID)
}
```

### Get Form

```js
async function() {
  const form = await apiClient.getFormLatest(FORM_ID)
}
```

### Submit Form

```js
async function() {
  const submit = await apiClient.postFormAnswers(FORM_VERSION_ID, { ...YOUR_FORM_FIRLD_ANSWERS, _spearly_gotcha: '' })
}
```

## Support TypeScript

Type definitions are also included, so there is no need to add anything else.

- `GetParams` : This is options that can be set when retrieving the ContentList.
- `List` : The type of the content list returned by the API.
- `Content` : The type of content returned by the API.
- `Form` : The type of form returned by the API.
