/*!
 * JEC GlassCat Core Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-glasscat-core" {

import { SourceFileInspector, FilePreProcessor, FileProperties, JcadContext,
         JecContainer, Decorator, AbstractDecoratorConnector, UrlPattern,
         AbstractLogger, LogFormatter, BootstrapParams, BootstrapContext,
         Logger, BootstrapScript, ContainerContext, CacheControlPolicy,
         Locale, LogLevelString, LogLevel, HttpConnectionType,
         HttpStatusCode } from "jec-commons";
import { LocaleManager } from "jec-commons-node";
import { JsletContext, Jslet, SessionError, HttpResponse, HttpRequest,
         WebJsletParams, SessionContext, SecurityContext, CookieOptions,
         SendFileOptions, SecurityRole, SecurityConstraint, StaticResources,
         SessionId, SessionOwner, Session, Credentials, UserHashModule,
         Realm, RealmConnector, AuthenticationError, SessionErrorType,
         AuthMethod, RealmType, SessionStorageType } from "jec-exchange";
import * as express from "express";
import * as http from "http";

/*PLACEHOLDER*/}