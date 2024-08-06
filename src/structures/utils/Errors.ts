export class InvalidEnvironment extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Mirai [InvalidEnvironment]";
  }
}

export class InvalidEmbedsLength extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Mirai [InvalidEmbedsLength]";
  }
}

export class InvalidMessage extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Mirai [InvalidMessage]";
  }
}

export class InvalidPageNumber extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Mirai [InvalidPageNumber]";
  }
}
