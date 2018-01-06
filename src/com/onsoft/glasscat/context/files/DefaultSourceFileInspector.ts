//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {LoggerManager} from "../../util/logging/LoggerManager";
import {DomainConnector} from "../../domains/connectors/DomainConnector";
import {Logger, UrlStringsEnum, SourceFileInspector, FilePreProcessor,
        FileProperties, InspectMode, InspectModeUtil} from "jec-commons";
import {WalkPathUtil, LocaleManager} from "jec-commons-node";
import {CacheableFile} from "./CacheableFile";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";

/**
 * The default <code>SourceFileInspector</code> implementation for all GlassCat
 * containers.
 */
export class DefaultSourceFileInspector implements SourceFileInspector {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultSourceFileInspector</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The collection of <code>FilePreProcessor</code> instances used by this
   * inspector.
   */
  private _processors:Array<FilePreProcessor> = null;

  /**
   * The collection of source path to inspect.
   */
  private _sourcePaths:Array<string> = null;

  /**
   * The <code>DomainConnector</code> instance associated with this inspector.
   */
  private _connector:DomainConnector = null;

  /**
   * The target location for the source paths to inspect.
   */
  private _target:string = null;

  /**
   * The helper object that lists all files in a directory.
   */
  private _walkUtil:WalkPathUtil = null;

  /**
   * The cache used by this inspector whent inspect mode is
   * <code>InspectMode.READ_CACHE</code>, or
   * <code>InspectMode.FILL_CACHE</code>.
   */
  private _cache:Map<string, CacheableFile[]> = null;

  /**
   * The helper object that converts <code>InspectMode</code> constants to
   * strings for log messages.
   */
  private _inspectModeUtil:InspectModeUtil = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._processors = new Array<FilePreProcessor>();
    this._sourcePaths = new Array<string>();
    this._walkUtil = new WalkPathUtil();
    this._cache = new Map<string, CacheableFile[]>();
    this._inspectModeUtil = new InspectModeUtil();
  }

  /**
   * Inspects the specified source path.
   * 
   * @param {string} sourcePath the source path to inspect.
   * @param {number} inspectMode specifies the process used by this file
   *                             inspector to inspect files. Valid values are
   *                             the constants of the <code>InspectMode</code>
   *                             class.
   */
  private inspectSourcePath(sourcePath:string, inspectMode:number):void {
    let file:string = null;
    let targetPath:string = this._target + sourcePath;
    let cacheableFile:CacheableFile = null;
    let fillCacheMode:boolean = inspectMode === InspectMode.FILL_CACHE;
    let cachedFiles:Array<CacheableFile> = null;
    if(fillCacheMode) {
      cachedFiles = new Array<CacheableFile>();
      this._cache.set(sourcePath, cachedFiles);
    }
    this.notifyProcessStart(targetPath);
    this._walkUtil.walkSync(targetPath, (file:FileProperties)=> {
      if(fillCacheMode) {
        cacheableFile = new CacheableFile();
        cacheableFile.file = file;
        cacheableFile.sourcePath = sourcePath;
        cachedFiles.push(cacheableFile);
      }
      this.processFile(file);
    });
    this.notifyProcessComplete(targetPath);
  }

  /**
   * Notifies the specified <code>FileProperties</code> instance to all the
   * registered processors.
   * 
   * @param {FileProperties} file the <code>FileProperties</code> instance
   *                              notify to all the registered processors.
   */
  private processFile(file:FileProperties):void {
    let len:number = this._processors.length;
    while(len--) {
      this._processors[len].process(file, this._connector);
    }
  }

  /**
   * Notifies the registered processors that the process for the current source  
   * path starts.
   * 
   * @param {string} sourcePath the current source path.
   */
  private notifyProcessStart(sourcePath:string):void {
    let len:number = this._processors.length;
    while(len--) {
      this._processors[len].processStart(this._connector, sourcePath);
    }
  }
  /**
   * Notifies the registered processors that the process for the current source  
   * path is over.
   * 
   * @param {string} sourcePath the current source path.
   */
  private notifyProcessComplete(sourcePath:string):void {
    let len:number = this._processors.length;
    while(len--) {
      this._processors[len].processComplete(this._connector, sourcePath);
    }
  }

  /**
   * Inspects all files in the cache.
   */
  private inspectCache():void {
    let len:number = -1;
    let cacheableFile:CacheableFile = null
    let targetPath:string = this._target;
    this._cache.forEach((value:CacheableFile[], srcPath:string)=> {
      targetPath = this._target + srcPath;
      this.notifyProcessStart(targetPath);
      len = value.length;
      while(len--) {
        cacheableFile = value[len];
        this.processFile(cacheableFile.file);
      }
      this.notifyProcessComplete(targetPath);
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setWatcher(connector:DomainConnector):void {
    let logManager:Logger = LoggerManager.getInstance();
    let i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    if(this._connector) {
      logManager.error(i18n.get("srcInspector.initError"));
    } else {
      this._connector = connector;
      this._target = connector.getTarget() + UrlStringsEnum.SLASH;
      logManager.info(i18n.get("srcInspector.init"));
      this.addSourcePath("src");
    }
  }

  /**
   * @inheritDoc
   */
   public getWatcher():DomainConnector {
     return this._connector;
   }

  /**
   * @inheritDoc
   */
  public addProcessor(processor:FilePreProcessor):void {
    this._processors.push(processor);
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get(
        "srcInspector.processorAdded", processor.constructor.name
      )
    );
  }

  /**
   * @inheritDoc
   */
  public removeProcessor(processor:FilePreProcessor):boolean {
    let result:boolean = false;
    let id:number = this._processors.indexOf(processor);
    if(id !== -1) {
      this._processors.splice(id, 1);
      LoggerManager.getInstance().info(
        GlassCatLocaleManager.getInstance().get(
          "srcInspector.processorRemoved", processor.constructor.name
        )
      );
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public addSourcePath(path:string):void {
    this._sourcePaths.push(path);
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get(
        "srcInspector.sourcePathAdded", path
      )
    );
  }

  /**
   * @inheritDoc
   */
  public inspect(inspectMode:number):void {
    let len:number = this._processors.length;
    let logManager:Logger = LoggerManager.getInstance();
    let i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    if(len > 0) {
      logManager.info(i18n.get("srcInspector.lookupStart"));
      logManager.info(
        i18n.get(
          "srcInspector.inspectMode",
          this._inspectModeUtil.inspectModeToString(inspectMode)
        )
      );
      if(inspectMode === InspectMode.READ_CACHE) {
        this.inspectCache();
      } else {
        len = this._sourcePaths.length;
        while(len--) {
          this.inspectSourcePath(this._sourcePaths[len], inspectMode);
        }
      }
      logManager.info(i18n.get("srcInspector.lookupComplete"));
    }
  }

  /**
   * @inheritDoc
   */
  public clearCache():void {
    this._cache.clear();
  }
}
