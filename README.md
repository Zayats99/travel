# Map - Prototype 

- [Live Link][live-link]

## Build-Time Environment Variables :building_construction:
In order to run/build the frontend application, you need to have certain environment variables set.
The easiest way of doing so is to create `.env.development` file at the application's root folder (check `.env.example`).
All environment variables need to be prefixed with: `REACT_APP_` e.g.: `REACT_APP_API_URL`

**Required variables**:
```
REACT_APP_ENV_NAME=local
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
```

## Installation :construction:

1. Run `yarn install` 

## Available Scripts :yarn:

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn lint`

Check code and styles against our internal standards

### `yarn commit`

This command invokes [commitizen/cz-cli](https://github.com/commitizen/cz-cli) prompt utility which will ask you several questions and generate the correct commit message. You can create commits by running `yarn commit` instead of `git commit` and go through the asked questions. Please refer to [GitHub workflow section][ghworkflow-link].

## Github Workflow :dna:
In order to maintain good strict [semver](https://semver.org/) versioning, our commit convention follows [conventionalcommits.org](https://www.conventionalcommits.org) workflow. This helps us to automatically determine version change by automatic analysis of git commits between two given releases.

### General commit message pattern
`type(scope?): description`

* `type` - Possible values are `feat | fix | docs | style | test | chore | ci`.
* `scope` - Any scope to which `type` applies, usually we either omit scope or use the component name / part of the app name.
* `description` - Description of changes, needs to start with **lowercase** character to pass checks.

Let’s assume that we are fixing expected behavior inside `Toolbox` component and we are not in any way changing the API of components which could lead to non-backward compatible issues. 
Commit message could be following:

`fix(Toolbox): change onClick handler to arrow function`

### Supported types:
 - **feat** - a new feature

  `feat(scope): description` or `feat: description`
 - **fix** - a bug fix

  `fix(scope): description` or `fix: description`
 - **docs** - documentation only changes

  `docs(scope): description` or `docs: description`
 - **style** - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

  `style(scope): description` or `style: description`
 - **test** - adding missing tests or correcting existing tests

  `test(scope): description` or `test: description`
 - **chore** - other changes that don't modify src or test files

  `chore(scope): description` or `chore: description`
 - **ci** - changes to our CI configuration files and scripts

  `ci(scope): description` or `ci: description`

### Introducing breaking changes
We try to always provide backward-compatible changes to our API but, if it’s necessary we might introduce a breaking change, we can do it by adding magic constant `BREAKING CHANGE` somewhere to commit description. This keyword will trigger `major` version bump to the package version.

## Deployment :rocket:
- The application is **automatically deployed** to the staging environment on every [commit worth deploying][commits-worth-deploying-link] to the `main` branch.
- When the new version is released (using the release workflow), it triggers another workflow, that will build a docker container, publish to the registry and deploy the application :rotating_light: **automatically to the production** :rotating_light:.

When building the production/staging version, it uses either `yarn build` or `yarn build:staging` command with particular environment configs from the repository's root (`.env.production` / `.env.staging`).

As the application is built at an "external server" it requires `GRAVITY_BOT_PACKAGES_READ_TOKEN` to be set at the provider's side as an encrypted environment variable.

### Commits worth deploying
Every merge to the `main` branch will results in the check if the given commit should be deployed to the staging or not. Currently, we're skipping these types of commits: `ci | chore | docs | style | test`, only `feat | fix` are consider worth deploying. You also have the possibility to skip deploying to staging simply by passing `[skip staging]` as a part of the commit message (this can be handy in case you're merging multiple pull-requests one after another).

[live-link]: #
[cc-link]: https://conventionalcommits.org/
[ghworkflow-link]: #github-workflow-dna
[commits-worth-deploying-link]: #commits-worth-deploying
