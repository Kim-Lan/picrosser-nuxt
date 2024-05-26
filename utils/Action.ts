export class Action {
  tag: 'cell' | 'row-key' | 'col-key';
  indexA: number;
  indexB: number;
  prevValue: string;
  newValue: string;

  constructor(tag: 'cell' | 'row-key' | 'col-key', indexA: number, indexB: number, prevValue: string, newValue: string) {
    this.tag = tag;
    this.indexA = indexA;
    this.indexB = indexB;
    this.prevValue = prevValue;
    this.newValue = newValue;
  }

  toJSON() {
    return {
      tag: this.tag,
      indexA: this.indexA,
      indexB: this.indexB,
      prevValue: this.prevValue,
      newValue: this.newValue,
    }
  }

  toString() {
    return this.tag + ' (' + this.indexA + ', ' + this.indexB + ') : ' + this.prevValue + "=>" + this.newValue;
  }

  getTag() {
    return this.tag;
  }

  getIndexA() {
    return this.indexA;
  }

  getIndexB() {
    return this.indexB;
  }

  getPrevValue() {
    return this.prevValue;
  }

  getNewValue() {
    return this.newValue;
  }

  isCell() {
    return this.tag === 'cell';
  }
}

export class ActionNode extends Action {
  previous: ActionNode | undefined;
  next: ActionNode | undefined;
}

export class ActionList {
  head: ActionNode | undefined;
  tail: ActionNode | undefined;
  current: ActionNode | undefined;

  push(type: 'cell' | 'row-key' | 'col-key', indexA: number, indexB: number, prevValue: string, newValue: string) {
    // this.length++;
    const newAction = new ActionNode(type, indexA, indexB, prevValue, newValue);
    if (this.current) {
        this.current.next = newAction;
        newAction.previous = this.current;
    } else {
        this.head = newAction;
    }

    this.tail = newAction;
    this.current = newAction;
    console.log("adding action: " + newAction.toString());
    console.log(JSON.stringify(this));
    return newAction;
  }

  undo() {
    if (this.current) {
      // const inverse = this.InverseList.pop()
      const current = this.current;
      this.current = this.current.previous;
      return current;
    }
    return null;
  }

  redo() {
    if (this.current && this.current.next !== undefined) {
      this.current = this.current.next;
      return this.current;
    } else if (this.current === undefined && this.head !== undefined) {
      this.current = this.head;
      return this.current;
    }
    return null;
  }

  // toJSON() {
  //     return { head: this.head,
  //         tail: this.tail,
  //         current: this.current,
  //     }
  // }
}

