// package: alice_v1
// file: alice_v1.proto

import * as jspb from "google-protobuf";

export class RegistrationRequest extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): RegistrationRequest.User | undefined;
  setUser(value?: RegistrationRequest.User): void;

  hasWorkspace(): boolean;
  clearWorkspace(): void;
  getWorkspace(): RegistrationRequest.Workspace | undefined;
  setWorkspace(value?: RegistrationRequest.Workspace): void;

  clearCardWithItemsList(): void;
  getCardWithItemsList(): Array<RegistrationRequest.CardWithItems>;
  setCardWithItemsList(value: Array<RegistrationRequest.CardWithItems>): void;
  addCardWithItems(value?: RegistrationRequest.CardWithItems, index?: number): RegistrationRequest.CardWithItems;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegistrationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegistrationRequest): RegistrationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegistrationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegistrationRequest;
  static deserializeBinaryFromReader(message: RegistrationRequest, reader: jspb.BinaryReader): RegistrationRequest;
}

export namespace RegistrationRequest {
  export type AsObject = {
    user?: RegistrationRequest.User.AsObject,
    workspace?: RegistrationRequest.Workspace.AsObject,
    cardWithItemsList: Array<RegistrationRequest.CardWithItems.AsObject>,
  }

  export class User extends jspb.Message {
    getVer(): number;
    setVer(value: number): void;

    getIdentity(): string;
    setIdentity(value: string): void;

    getVerifier(): Uint8Array | string;
    getVerifier_asU8(): Uint8Array;
    getVerifier_asB64(): string;
    setVerifier(value: Uint8Array | string): void;

    getSrpSalt(): Uint8Array | string;
    getSrpSalt_asU8(): Uint8Array;
    getSrpSalt_asB64(): string;
    setSrpSalt(value: Uint8Array | string): void;

    getPasswdSalt(): Uint8Array | string;
    getPasswdSalt_asU8(): Uint8Array;
    getPasswdSalt_asB64(): string;
    setPasswdSalt(value: Uint8Array | string): void;

    getPrivKeyEnc(): Uint8Array | string;
    getPrivKeyEnc_asU8(): Uint8Array;
    getPrivKeyEnc_asB64(): string;
    setPrivKeyEnc(value: Uint8Array | string): void;

    getPubkey(): Uint8Array | string;
    getPubkey_asU8(): Uint8Array;
    getPubkey_asB64(): string;
    setPubkey(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
  }

  export namespace User {
    export type AsObject = {
      ver: number,
      identity: string,
      verifier: Uint8Array | string,
      srpSalt: Uint8Array | string,
      passwdSalt: Uint8Array | string,
      privKeyEnc: Uint8Array | string,
      pubkey: Uint8Array | string,
    }
  }

  export class Workspace extends jspb.Message {
    getAedKeyEnc(): Uint8Array | string;
    getAedKeyEnc_asU8(): Uint8Array;
    getAedKeyEnc_asB64(): string;
    setAedKeyEnc(value: Uint8Array | string): void;

    getTitleEnc(): Uint8Array | string;
    getTitleEnc_asU8(): Uint8Array;
    getTitleEnc_asB64(): string;
    setTitleEnc(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Workspace.AsObject;
    static toObject(includeInstance: boolean, msg: Workspace): Workspace.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Workspace, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Workspace;
    static deserializeBinaryFromReader(message: Workspace, reader: jspb.BinaryReader): Workspace;
  }

  export namespace Workspace {
    export type AsObject = {
      aedKeyEnc: Uint8Array | string,
      titleEnc: Uint8Array | string,
    }
  }

  export class CardItem extends jspb.Message {
    getTitleEnc(): Uint8Array | string;
    getTitleEnc_asU8(): Uint8Array;
    getTitleEnc_asB64(): string;
    setTitleEnc(value: Uint8Array | string): void;

    getBodyEnc(): Uint8Array | string;
    getBodyEnc_asU8(): Uint8Array;
    getBodyEnc_asB64(): string;
    setBodyEnc(value: Uint8Array | string): void;

    getHidden(): boolean;
    setHidden(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CardItem.AsObject;
    static toObject(includeInstance: boolean, msg: CardItem): CardItem.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CardItem, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CardItem;
    static deserializeBinaryFromReader(message: CardItem, reader: jspb.BinaryReader): CardItem;
  }

  export namespace CardItem {
    export type AsObject = {
      titleEnc: Uint8Array | string,
      bodyEnc: Uint8Array | string,
      hidden: boolean,
    }
  }

  export class CardWithItems extends jspb.Message {
    getTitleEnc(): Uint8Array | string;
    getTitleEnc_asU8(): Uint8Array;
    getTitleEnc_asB64(): string;
    setTitleEnc(value: Uint8Array | string): void;

    clearTagsEncList(): void;
    getTagsEncList(): Array<Uint8Array | string>;
    getTagsEncList_asU8(): Array<Uint8Array>;
    getTagsEncList_asB64(): Array<string>;
    setTagsEncList(value: Array<Uint8Array | string>): void;
    addTagsEnc(value: Uint8Array | string, index?: number): Uint8Array | string;

    clearItemsList(): void;
    getItemsList(): Array<RegistrationRequest.CardItem>;
    setItemsList(value: Array<RegistrationRequest.CardItem>): void;
    addItems(value?: RegistrationRequest.CardItem, index?: number): RegistrationRequest.CardItem;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CardWithItems.AsObject;
    static toObject(includeInstance: boolean, msg: CardWithItems): CardWithItems.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CardWithItems, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CardWithItems;
    static deserializeBinaryFromReader(message: CardWithItems, reader: jspb.BinaryReader): CardWithItems;
  }

  export namespace CardWithItems {
    export type AsObject = {
      titleEnc: Uint8Array | string,
      tagsEncList: Array<Uint8Array | string>,
      itemsList: Array<RegistrationRequest.CardItem.AsObject>,
    }
  }
}

export class Login0Request extends jspb.Message {
  getIdentity(): string;
  setIdentity(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login0Request.AsObject;
  static toObject(includeInstance: boolean, msg: Login0Request): Login0Request.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login0Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login0Request;
  static deserializeBinaryFromReader(message: Login0Request, reader: jspb.BinaryReader): Login0Request;
}

export namespace Login0Request {
  export type AsObject = {
    identity: string,
  }
}

export class Login0Response extends jspb.Message {
  getMutual(): Uint8Array | string;
  getMutual_asU8(): Uint8Array;
  getMutual_asB64(): string;
  setMutual(value: Uint8Array | string): void;

  getSalt(): Uint8Array | string;
  getSalt_asU8(): Uint8Array;
  getSalt_asB64(): string;
  setSalt(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login0Response.AsObject;
  static toObject(includeInstance: boolean, msg: Login0Response): Login0Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login0Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login0Response;
  static deserializeBinaryFromReader(message: Login0Response, reader: jspb.BinaryReader): Login0Response;
}

export namespace Login0Response {
  export type AsObject = {
    mutual: Uint8Array | string,
    salt: Uint8Array | string,
  }
}

export class Login1Request extends jspb.Message {
  getMutual(): Uint8Array | string;
  getMutual_asU8(): Uint8Array;
  getMutual_asB64(): string;
  setMutual(value: Uint8Array | string): void;

  getProof(): Uint8Array | string;
  getProof_asU8(): Uint8Array;
  getProof_asB64(): string;
  setProof(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login1Request.AsObject;
  static toObject(includeInstance: boolean, msg: Login1Request): Login1Request.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login1Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login1Request;
  static deserializeBinaryFromReader(message: Login1Request, reader: jspb.BinaryReader): Login1Request;
}

export namespace Login1Request {
  export type AsObject = {
    mutual: Uint8Array | string,
    proof: Uint8Array | string,
  }
}

export class Login1Response extends jspb.Message {
  getProof(): Uint8Array | string;
  getProof_asU8(): Uint8Array;
  getProof_asB64(): string;
  setProof(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login1Response.AsObject;
  static toObject(includeInstance: boolean, msg: Login1Response): Login1Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login1Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login1Response;
  static deserializeBinaryFromReader(message: Login1Response, reader: jspb.BinaryReader): Login1Response;
}

export namespace Login1Response {
  export type AsObject = {
    proof: Uint8Array | string,
  }
}

export class CreateWorkspaceRequest extends jspb.Message {
  getAedKeyEnc(): Uint8Array | string;
  getAedKeyEnc_asU8(): Uint8Array;
  getAedKeyEnc_asB64(): string;
  setAedKeyEnc(value: Uint8Array | string): void;

  getAedKeyTag(): Uint8Array | string;
  getAedKeyTag_asU8(): Uint8Array;
  getAedKeyTag_asB64(): string;
  setAedKeyTag(value: Uint8Array | string): void;

  getTitleEnc(): Uint8Array | string;
  getTitleEnc_asU8(): Uint8Array;
  getTitleEnc_asB64(): string;
  setTitleEnc(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWorkspaceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWorkspaceRequest): CreateWorkspaceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWorkspaceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWorkspaceRequest;
  static deserializeBinaryFromReader(message: CreateWorkspaceRequest, reader: jspb.BinaryReader): CreateWorkspaceRequest;
}

export namespace CreateWorkspaceRequest {
  export type AsObject = {
    aedKeyEnc: Uint8Array | string,
    aedKeyTag: Uint8Array | string,
    titleEnc: Uint8Array | string,
  }
}

export class CreateWorkspaceResponse extends jspb.Message {
  hasWorkspace(): boolean;
  clearWorkspace(): void;
  getWorkspace(): UserWithWorkspace | undefined;
  setWorkspace(value?: UserWithWorkspace): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWorkspaceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWorkspaceResponse): CreateWorkspaceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWorkspaceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWorkspaceResponse;
  static deserializeBinaryFromReader(message: CreateWorkspaceResponse, reader: jspb.BinaryReader): CreateWorkspaceResponse;
}

export namespace CreateWorkspaceResponse {
  export type AsObject = {
    workspace?: UserWithWorkspace.AsObject,
  }
}

export class UpsertCardRequest extends jspb.Message {
  hasCard(): boolean;
  clearCard(): void;
  getCard(): Card | undefined;
  setCard(value?: Card): void;

  clearCardItemsList(): void;
  getCardItemsList(): Array<CardItem>;
  setCardItemsList(value: Array<CardItem>): void;
  addCardItems(value?: CardItem, index?: number): CardItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertCardRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertCardRequest): UpsertCardRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpsertCardRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertCardRequest;
  static deserializeBinaryFromReader(message: UpsertCardRequest, reader: jspb.BinaryReader): UpsertCardRequest;
}

export namespace UpsertCardRequest {
  export type AsObject = {
    card?: Card.AsObject,
    cardItemsList: Array<CardItem.AsObject>,
  }
}

export class UpsertCardResponse extends jspb.Message {
  hasCard(): boolean;
  clearCard(): void;
  getCard(): Card | undefined;
  setCard(value?: Card): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertCardResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertCardResponse): UpsertCardResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpsertCardResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertCardResponse;
  static deserializeBinaryFromReader(message: UpsertCardResponse, reader: jspb.BinaryReader): UpsertCardResponse;
}

export namespace UpsertCardResponse {
  export type AsObject = {
    card?: Card.AsObject,
  }
}

export class CloneCardRequest extends jspb.Message {
  getTitleEnc(): Uint8Array | string;
  getTitleEnc_asU8(): Uint8Array;
  getTitleEnc_asB64(): string;
  setTitleEnc(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CloneCardRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CloneCardRequest): CloneCardRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CloneCardRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CloneCardRequest;
  static deserializeBinaryFromReader(message: CloneCardRequest, reader: jspb.BinaryReader): CloneCardRequest;
}

export namespace CloneCardRequest {
  export type AsObject = {
    titleEnc: Uint8Array | string,
  }
}

export class CloneCardResponse extends jspb.Message {
  hasCard(): boolean;
  clearCard(): void;
  getCard(): Card | undefined;
  setCard(value?: Card): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CloneCardResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CloneCardResponse): CloneCardResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CloneCardResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CloneCardResponse;
  static deserializeBinaryFromReader(message: CloneCardResponse, reader: jspb.BinaryReader): CloneCardResponse;
}

export namespace CloneCardResponse {
  export type AsObject = {
    card?: Card.AsObject,
  }
}

export class ListWorkspacesResponse extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<UserWithWorkspace>;
  setItemsList(value: Array<UserWithWorkspace>): void;
  addItems(value?: UserWithWorkspace, index?: number): UserWithWorkspace;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListWorkspacesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListWorkspacesResponse): ListWorkspacesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListWorkspacesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListWorkspacesResponse;
  static deserializeBinaryFromReader(message: ListWorkspacesResponse, reader: jspb.BinaryReader): ListWorkspacesResponse;
}

export namespace ListWorkspacesResponse {
  export type AsObject = {
    itemsList: Array<UserWithWorkspace.AsObject>,
  }
}

export class PrivUser extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getReadonly(): boolean;
  setReadonly(value: boolean): void;

  getPasswdSalt(): Uint8Array | string;
  getPasswdSalt_asU8(): Uint8Array;
  getPasswdSalt_asB64(): string;
  setPasswdSalt(value: Uint8Array | string): void;

  getPrivKeyEnc(): Uint8Array | string;
  getPrivKeyEnc_asU8(): Uint8Array;
  getPrivKeyEnc_asB64(): string;
  setPrivKeyEnc(value: Uint8Array | string): void;

  getPubKey(): Uint8Array | string;
  getPubKey_asU8(): Uint8Array;
  getPubKey_asB64(): string;
  setPubKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrivUser.AsObject;
  static toObject(includeInstance: boolean, msg: PrivUser): PrivUser.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PrivUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PrivUser;
  static deserializeBinaryFromReader(message: PrivUser, reader: jspb.BinaryReader): PrivUser;
}

export namespace PrivUser {
  export type AsObject = {
    id: string,
    readonly: boolean,
    passwdSalt: Uint8Array | string,
    privKeyEnc: Uint8Array | string,
    pubKey: Uint8Array | string,
  }
}

export class WhoAmIResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): PrivUser | undefined;
  setUser(value?: PrivUser): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WhoAmIResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WhoAmIResponse): WhoAmIResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WhoAmIResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WhoAmIResponse;
  static deserializeBinaryFromReader(message: WhoAmIResponse, reader: jspb.BinaryReader): WhoAmIResponse;
}

export namespace WhoAmIResponse {
  export type AsObject = {
    user?: PrivUser.AsObject,
  }
}

export class Card extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getWorkspaceId(): string;
  setWorkspaceId(value: string): void;

  getArchived(): boolean;
  setArchived(value: boolean): void;

  getTitleEnc(): Uint8Array | string;
  getTitleEnc_asU8(): Uint8Array;
  getTitleEnc_asB64(): string;
  setTitleEnc(value: Uint8Array | string): void;

  clearTagsEncList(): void;
  getTagsEncList(): Array<Uint8Array | string>;
  getTagsEncList_asU8(): Array<Uint8Array>;
  getTagsEncList_asB64(): Array<string>;
  setTagsEncList(value: Array<Uint8Array | string>): void;
  addTagsEnc(value: Uint8Array | string, index?: number): Uint8Array | string;

  getCreatedAt(): string;
  setCreatedAt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Card.AsObject;
  static toObject(includeInstance: boolean, msg: Card): Card.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Card, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Card;
  static deserializeBinaryFromReader(message: Card, reader: jspb.BinaryReader): Card;
}

export namespace Card {
  export type AsObject = {
    id: string,
    workspaceId: string,
    archived: boolean,
    titleEnc: Uint8Array | string,
    tagsEncList: Array<Uint8Array | string>,
    createdAt: string,
  }
}

export class CardItem extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getCardId(): string;
  setCardId(value: string): void;

  getPosition(): number;
  setPosition(value: number): void;

  getTitleEnc(): Uint8Array | string;
  getTitleEnc_asU8(): Uint8Array;
  getTitleEnc_asB64(): string;
  setTitleEnc(value: Uint8Array | string): void;

  getBodyEnc(): Uint8Array | string;
  getBodyEnc_asU8(): Uint8Array;
  getBodyEnc_asB64(): string;
  setBodyEnc(value: Uint8Array | string): void;

  getHidden(): boolean;
  setHidden(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CardItem.AsObject;
  static toObject(includeInstance: boolean, msg: CardItem): CardItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CardItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CardItem;
  static deserializeBinaryFromReader(message: CardItem, reader: jspb.BinaryReader): CardItem;
}

export namespace CardItem {
  export type AsObject = {
    id: string,
    cardId: string,
    position: number,
    titleEnc: Uint8Array | string,
    bodyEnc: Uint8Array | string,
    hidden: boolean,
  }
}

export class UserWithWorkspace extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getOwnerId(): string;
  setOwnerId(value: string): void;

  getOwnerPubKey(): Uint8Array | string;
  getOwnerPubKey_asU8(): Uint8Array;
  getOwnerPubKey_asB64(): string;
  setOwnerPubKey(value: Uint8Array | string): void;

  getWorkspaceId(): string;
  setWorkspaceId(value: string): void;

  getAedKeyEnc(): Uint8Array | string;
  getAedKeyEnc_asU8(): Uint8Array;
  getAedKeyEnc_asB64(): string;
  setAedKeyEnc(value: Uint8Array | string): void;

  getAedKeyTag(): Uint8Array | string;
  getAedKeyTag_asU8(): Uint8Array;
  getAedKeyTag_asB64(): string;
  setAedKeyTag(value: Uint8Array | string): void;

  getTitleEnc(): Uint8Array | string;
  getTitleEnc_asU8(): Uint8Array;
  getTitleEnc_asB64(): string;
  setTitleEnc(value: Uint8Array | string): void;

  getCreatedAt(): string;
  setCreatedAt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserWithWorkspace.AsObject;
  static toObject(includeInstance: boolean, msg: UserWithWorkspace): UserWithWorkspace.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserWithWorkspace, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserWithWorkspace;
  static deserializeBinaryFromReader(message: UserWithWorkspace, reader: jspb.BinaryReader): UserWithWorkspace;
}

export namespace UserWithWorkspace {
  export type AsObject = {
    id: string,
    userId: string,
    ownerId: string,
    ownerPubKey: Uint8Array | string,
    workspaceId: string,
    aedKeyEnc: Uint8Array | string,
    aedKeyTag: Uint8Array | string,
    titleEnc: Uint8Array | string,
    createdAt: string,
  }
}

export class ListCardsResponse extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<Card>;
  setItemsList(value: Array<Card>): void;
  addItems(value?: Card, index?: number): Card;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCardsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCardsResponse): ListCardsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCardsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCardsResponse;
  static deserializeBinaryFromReader(message: ListCardsResponse, reader: jspb.BinaryReader): ListCardsResponse;
}

export namespace ListCardsResponse {
  export type AsObject = {
    itemsList: Array<Card.AsObject>,
  }
}

export class ListCardItemsResponse extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<CardItem>;
  setItemsList(value: Array<CardItem>): void;
  addItems(value?: CardItem, index?: number): CardItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCardItemsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCardItemsResponse): ListCardItemsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCardItemsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCardItemsResponse;
  static deserializeBinaryFromReader(message: ListCardItemsResponse, reader: jspb.BinaryReader): ListCardItemsResponse;
}

export namespace ListCardItemsResponse {
  export type AsObject = {
    itemsList: Array<CardItem.AsObject>,
  }
}

export class ArchiveCardResponse extends jspb.Message {
  getArchived(): boolean;
  setArchived(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveCardResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveCardResponse): ArchiveCardResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchiveCardResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveCardResponse;
  static deserializeBinaryFromReader(message: ArchiveCardResponse, reader: jspb.BinaryReader): ArchiveCardResponse;
}

export namespace ArchiveCardResponse {
  export type AsObject = {
    archived: boolean,
  }
}

export class TerminateRequest extends jspb.Message {
  getIdentity(): string;
  setIdentity(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TerminateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TerminateRequest): TerminateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TerminateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TerminateRequest;
  static deserializeBinaryFromReader(message: TerminateRequest, reader: jspb.BinaryReader): TerminateRequest;
}

export namespace TerminateRequest {
  export type AsObject = {
    identity: string,
  }
}

export class UpdateWorkspaceRequest extends jspb.Message {
  getTitleEnc(): Uint8Array | string;
  getTitleEnc_asU8(): Uint8Array;
  getTitleEnc_asB64(): string;
  setTitleEnc(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateWorkspaceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateWorkspaceRequest): UpdateWorkspaceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateWorkspaceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateWorkspaceRequest;
  static deserializeBinaryFromReader(message: UpdateWorkspaceRequest, reader: jspb.BinaryReader): UpdateWorkspaceRequest;
}

export namespace UpdateWorkspaceRequest {
  export type AsObject = {
    titleEnc: Uint8Array | string,
  }
}

export class UpdateWorkspaceResponse extends jspb.Message {
  hasWorkspace(): boolean;
  clearWorkspace(): void;
  getWorkspace(): UserWithWorkspace | undefined;
  setWorkspace(value?: UserWithWorkspace): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateWorkspaceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateWorkspaceResponse): UpdateWorkspaceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateWorkspaceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateWorkspaceResponse;
  static deserializeBinaryFromReader(message: UpdateWorkspaceResponse, reader: jspb.BinaryReader): UpdateWorkspaceResponse;
}

export namespace UpdateWorkspaceResponse {
  export type AsObject = {
    workspace?: UserWithWorkspace.AsObject,
  }
}

export class UpdateCredentialsRequest extends jspb.Message {
  getOldIdentity(): string;
  setOldIdentity(value: string): void;

  getNewIdentity(): string;
  setNewIdentity(value: string): void;

  getVerifier(): Uint8Array | string;
  getVerifier_asU8(): Uint8Array;
  getVerifier_asB64(): string;
  setVerifier(value: Uint8Array | string): void;

  getSrpSalt(): Uint8Array | string;
  getSrpSalt_asU8(): Uint8Array;
  getSrpSalt_asB64(): string;
  setSrpSalt(value: Uint8Array | string): void;

  getPasswdSalt(): Uint8Array | string;
  getPasswdSalt_asU8(): Uint8Array;
  getPasswdSalt_asB64(): string;
  setPasswdSalt(value: Uint8Array | string): void;

  getPrivKeyEnc(): Uint8Array | string;
  getPrivKeyEnc_asU8(): Uint8Array;
  getPrivKeyEnc_asB64(): string;
  setPrivKeyEnc(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCredentialsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCredentialsRequest): UpdateCredentialsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateCredentialsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCredentialsRequest;
  static deserializeBinaryFromReader(message: UpdateCredentialsRequest, reader: jspb.BinaryReader): UpdateCredentialsRequest;
}

export namespace UpdateCredentialsRequest {
  export type AsObject = {
    oldIdentity: string,
    newIdentity: string,
    verifier: Uint8Array | string,
    srpSalt: Uint8Array | string,
    passwdSalt: Uint8Array | string,
    privKeyEnc: Uint8Array | string,
  }
}

export class UpdateCredentialsResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): PrivUser | undefined;
  setUser(value?: PrivUser): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCredentialsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCredentialsResponse): UpdateCredentialsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateCredentialsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCredentialsResponse;
  static deserializeBinaryFromReader(message: UpdateCredentialsResponse, reader: jspb.BinaryReader): UpdateCredentialsResponse;
}

export namespace UpdateCredentialsResponse {
  export type AsObject = {
    user?: PrivUser.AsObject,
  }
}

