export function AutoUnsubscribe(blackList = []): ClassDecorator {

  return function (constructor) {
      const original = constructor.prototype.ngOnDestroy;

      constructor.prototype.ngOnDestroy = function () {
          for (let prop in this) {
              const property = this[prop];
              if (!blackList.includes(prop)) {
                  if (property && (typeof property.unsubscribe === "function")) {
                      property.unsubscribe();
                  }
              }
          }
          original && typeof original === 'function' && original.apply(this, arguments);
      };
  }

}