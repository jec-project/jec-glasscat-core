# JEC GlassCat Core Project: Update Release Notes

<a name="jec-glasscat-core-0.1.8"></a>
## **0.1.8** (2018-08-29)

### Bug Fixes

- Fixing test cases issues due to dependencies upgrade

### Features

- Updating all dependencies
- Test cases improvements

<a name="jec-glasscat-core-0.1.7"></a>
## **0.1.7** (2018-07-14)

### Bug Fixes

### Features

- Adding new implementation of the `context` package, depending on the `jec-glasscat-config` module.

<a name="jec-glasscat-core-0.1.6"></a>
## **0.1.6** (2018-04-01)

### Bug Fixes

- **GlassCatHttpRequest**: fixing a bug on the `acceptsLanguages` method
- Adding support for jslets dependency injection

### Features

- JEC refactoring the `web.json` file has been removed from the `webapp/WEB-INF` directory and added to the new `JEC-INF` directory
- Adding implementation for the new `jec-exchange` 1.1.7 API

<a name="jec-glasscat-core-0.1.5"></a>
## **0.1.5** (2017-12-26)

### Bug Fixes

- **MappedPathUtil**: fixing paths structure by using the `path.normalize()` method

### Features

- Dependencies upgrade
- Adding support for the new `jec-jdi` module
- Fixing `jec-commons` module break changes

<a name="jec-glasscat-core-0.1.4"></a>
## **0.1.4** (2017-09-06)

### Bug Fixes

- **HTTP Host Redirection**: fixing the issue that prevents HTTP calls between multiple EJPs
- **bootstrap.json path**: setting the `GlassCatConfigUpdater.BOOTSTRAP_FILE_PATH` property to the correct path

### Features

- Dependencies upgrade
- Adding `@CacheControl` support
- Adding `@StaticResource` support

<a name="jec-glasscat-core-0.1.3"></a>
## **0.1.3** (2017-08-20)

### Bug Fixes

- **postinstall**: removing the post install script

### Features

- **dist**: adding binaries to the `dist` folder

<a name="jec-glasscat-core-0.1.2"></a>
## **0.1.2** (2017-08-20)

### Bug Fixes

### Features

- Fixing peer dependencies for GlassCat alpha releases integration

<a name="jec-glasscat-core-0.1.1"></a>
## **0.1.1** (2017-08-16)

### Bug Fixes

- **TypeScript**: addition of the `@types/node` type definitions to the development environment.

### Features

- **build**: adding build script to npm install process for GlassCat instal optimisation
- **index.ts**: refactoring index.ts file for better types generation
- Dependencies upgrade
- **@Bootstrap**: adding the `@Bootstrap` decorator implementation as specified by JEC

<a name="jec-glasscat-core-0.1.0"></a>
## **0.1.0** (2017-07-15)

### Bug Fixes

### Features

- First published release of the JEC GlassCat Core module

<a name="jec-glasscat-core-0.0.1"></a>
## **0.0.1** (2017-06-17)

### Bug Fixes

### Features

- Initial release of the JEC GlassCat Core module