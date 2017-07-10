/*!
 * JEC GlassCat Core Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-glasscat-core" {

import { SourceFileInspector, FilePreProcessor, FileProperties, JcadContext,
         JecContainer, Decorator, AbstractDecoratorConnector, UrlPattern,
         AbstractLogger, LogFormatter, Logger } from "jec-commons";
import { JsletContext, Jslet, SessionError, HttpResponse, HttpRequest,
         WebJsletParams, SessionContext, SecurityContext, CookieOptions,
         SendFileOptions, SecurityRole, SecurityConstraint, StaticResources,
         SessionId, SessionOwner, Session, Credentials, UserHashModule,
         Realm, RealmConnector } from "jec-exchange";
import * as express from "express";
import * as http from "http";

/*PLACEHOLDER*/}