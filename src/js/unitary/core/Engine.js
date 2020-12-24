/**
 * Created by nbeni on 12/6/2020.
 */



Unitary =  {
  debug: {},
  app: {
    components: {
      listTypes: () => {
        /* Lists all types used by the application
         * returns: {"{typeID}":{
         *     TypeID: a unique uri used to identify the type
         *     Name: human friendly name for the type
         *     isLibrary: boolean - is the type a WebWorker component
         *     isUI: boolean - is the type a UI component
         * }, ...}
         * */
      },
      listInstances: () => {
        /* Lists all instances instanciated in the application
         * returns: {"{InstanceID}":{
         *     InstanceID: a unique hash used to identify the instance
         *     TypeID: a unique uri used to identify the type
         *     TabTitle: the title displayed in the tab if user is
         *     TabSummary: the text displayed on mouseover of tab or when using screen reader
         *     ExecutionCtx: the execution context for the instance
         *
         * }, ...}
         * */
      },
      getInstance: () => {
        /* Get a single component instance in the application
         * returns: {"{InstanceID}":{
         *     InstanceID: a unique hash used to identify the instance
         *     TypeID: a unique uri used to identify the type
         *     TabTitle: the title displayed in the tab if user is
         *     TabSummary: the text displayed on mouseover of tab or when using screen reader
         *     ExecutionCtx: the execution context for the instance
         *
         * }, ...}
         * */
      },
      getInstancesByType: ()=> {
        /* Lists all instances of a type that are instanciated in the application
         * returns: {"{InstanceID}":{
         *     InstanceID: a unique hash used to identify the instance
         *     TypeID: a unique uri used to identify the type
         *     TabTitle: the title displayed in the tab if user is
         *     TabSummary: the text displayed on mouseover of tab or when using screen reader
         *     ExecutionCtx: the execution context for the instance
         *
         * }, ...}
         * */
      }
    },
  },
  ctx: {}
};
