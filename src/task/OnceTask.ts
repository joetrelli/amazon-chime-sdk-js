// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Task from './Task';

/**
 * A task that wraps another task and ensures it is run only once,
 * regardless of how many times `run` is called.
 *
 * This allows you to implement a kind of barrier synchronization.
 */
export default class OnceTask implements Task {
  private promise: Promise<void> | undefined;

  constructor(private task: Task) {}

  name(): string {
    return `${this.task.name()} (once)`;
  }

  cancel(): void {
    this.task.cancel();
  }

  run(): Promise<void> {
    if (this.promise) {
      return this.promise;
    }
    return (this.promise = this.task.run());
  }

  setParent(parentTask: Task): void {
    this.task.setParent(parentTask);
  }
}
