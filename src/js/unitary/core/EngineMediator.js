/**
 * Created by nbeni on 1/1/2021.
 * To use the mediator pattern for intra-engine component
 * calls (via delayed reference resolution)
 */

define([], function() {
  c_references = {};
  return {
    setReference: (name, reference) => {
      c_references[name] = reference;
    },
    getReference: (name) => {
      return c_references[name];
    }
  };
});

