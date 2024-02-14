# Angular/Fire Firestore Library Error Fix

## Overview

If you encounter an error with the `DatabaseSnapshotExists` and `DatabaseSnapshotDoesNotExist` interfaces in the Angular/Fire Firestore library, you can apply the following fix.

### Error Description

The error may manifest as TypeScript compilation errors related to the `exists()` method and the `forEach()` method in the `DatabaseSnapshotExists` and `DatabaseSnapshotDoesNotExist` interfaces.

### Fix

To resolve this issue, modify the interfaces as follows:

```typescript
export interface DatabaseSnapshotExists<T> extends firebase.database.DataSnapshot {
  exists(): true;
  val(): T;
  forEach(action: (a: firebase.database.DataSnapshot & { key: string }) => boolean | void): boolean;
}

export interface DatabaseSnapshotDoesNotExist<T> extends firebase.database.DataSnapshot {
  exists(): false;
  val(): null;
  forEach(action: (a: firebase.database.DataSnapshot & { key: string }) => boolean | void): boolean;
}