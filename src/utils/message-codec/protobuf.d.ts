import * as $protobuf from "protobufjs";
/** Namespace dtalk. */
export namespace dtalk {

    /** Namespace proto. */
    namespace proto {

        /** EventType enum. */
        enum EventType {
            commonMsg = 0,
            commonMsgAck = 1,
            Notice = 2,
            SYSNotice = 3
        }

        /** Properties of a Proto. */
        interface IProto {

            /** Proto eventType */
            eventType?: (dtalk.proto.EventType|null);

            /** Proto body */
            body?: (Uint8Array|null);
        }

        /** Represents a Proto. */
        class Proto implements IProto {

            /**
             * Constructs a new Proto.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IProto);

            /** Proto eventType. */
            public eventType: dtalk.proto.EventType;

            /** Proto body. */
            public body: Uint8Array;

            /**
             * Encodes the specified Proto message. Does not implicitly {@link dtalk.proto.Proto.verify|verify} messages.
             * @param message Proto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Proto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Proto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.Proto;

            /**
             * Creates a Proto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Proto
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.Proto;

            /**
             * Creates a plain object from a Proto message. Also converts values to other types if specified.
             * @param message Proto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.Proto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Proto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Channel enum. */
        enum Channel {
            ToUser = 0,
            ToGroup = 1
        }

        /** MsgType enum. */
        enum MsgType {
            System = 0,
            Text = 1,
            Audio = 2,
            Image = 3,
            Video = 4,
            File = 5,
            Card = 6,
            Alert = 7,
            Forward = 8,
            RTCCall = 9,
            Transfer = 10,
            Collect = 11,
            RedPacket = 12,
            ContactCard = 13
        }

        /** Properties of a SourceUser. */
        interface ISourceUser {

            /** SourceUser id */
            id?: (string|null);

            /** SourceUser name */
            name?: (string|null);
        }

        /** Represents a SourceUser. */
        class SourceUser implements ISourceUser {

            /**
             * Constructs a new SourceUser.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ISourceUser);

            /** SourceUser id. */
            public id: string;

            /** SourceUser name. */
            public name: string;

            /**
             * Encodes the specified SourceUser message. Does not implicitly {@link dtalk.proto.SourceUser.verify|verify} messages.
             * @param message SourceUser message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ISourceUser, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SourceUser message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SourceUser
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.SourceUser;

            /**
             * Creates a SourceUser message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SourceUser
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.SourceUser;

            /**
             * Creates a plain object from a SourceUser message. Also converts values to other types if specified.
             * @param message SourceUser
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.SourceUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SourceUser to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Source. */
        interface ISource {

            /** Source channelType */
            channelType?: (dtalk.proto.Channel|null);

            /** Source from */
            from?: (dtalk.proto.ISourceUser|null);

            /** Source target */
            target?: (dtalk.proto.ISourceUser|null);
        }

        /** Represents a Source. */
        class Source implements ISource {

            /**
             * Constructs a new Source.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ISource);

            /** Source channelType. */
            public channelType: dtalk.proto.Channel;

            /** Source from. */
            public from?: (dtalk.proto.ISourceUser|null);

            /** Source target. */
            public target?: (dtalk.proto.ISourceUser|null);

            /**
             * Encodes the specified Source message. Does not implicitly {@link dtalk.proto.Source.verify|verify} messages.
             * @param message Source message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ISource, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Source message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Source
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.Source;

            /**
             * Creates a Source message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Source
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.Source;

            /**
             * Creates a plain object from a Source message. Also converts values to other types if specified.
             * @param message Source
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.Source, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Source to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Reference. */
        interface IReference {

            /** Reference topic */
            topic?: (number|Long|null);

            /** Reference ref */
            ref?: (number|Long|null);
        }

        /** Represents a Reference. */
        class Reference implements IReference {

            /**
             * Constructs a new Reference.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IReference);

            /** Reference topic. */
            public topic: (number|Long);

            /** Reference ref. */
            public ref: (number|Long);

            /**
             * Encodes the specified Reference message. Does not implicitly {@link dtalk.proto.Reference.verify|verify} messages.
             * @param message Reference message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IReference, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Reference message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Reference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.Reference;

            /**
             * Creates a Reference message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Reference
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.Reference;

            /**
             * Creates a plain object from a Reference message. Also converts values to other types if specified.
             * @param message Reference
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.Reference, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Reference to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CommonMsg. */
        interface ICommonMsg {

            /** CommonMsg channelType */
            channelType?: (dtalk.proto.Channel|null);

            /** CommonMsg logId */
            logId?: (number|Long|null);

            /** CommonMsg msgId */
            msgId?: (string|null);

            /** CommonMsg from */
            from?: (string|null);

            /** CommonMsg target */
            target?: (string|null);

            /** CommonMsg msgType */
            msgType?: (dtalk.proto.MsgType|null);

            /** CommonMsg msg */
            msg?: (Uint8Array|null);

            /** CommonMsg datetime */
            datetime?: (number|Long|null);

            /** CommonMsg source */
            source?: (dtalk.proto.ISource|null);

            /** CommonMsg reference */
            reference?: (dtalk.proto.IReference|null);
        }

        /** Represents a CommonMsg. */
        class CommonMsg implements ICommonMsg {

            /**
             * Constructs a new CommonMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ICommonMsg);

            /** CommonMsg channelType. */
            public channelType: dtalk.proto.Channel;

            /** CommonMsg logId. */
            public logId: (number|Long);

            /** CommonMsg msgId. */
            public msgId: string;

            /** CommonMsg from. */
            public from: string;

            /** CommonMsg target. */
            public target: string;

            /** CommonMsg msgType. */
            public msgType: dtalk.proto.MsgType;

            /** CommonMsg msg. */
            public msg: Uint8Array;

            /** CommonMsg datetime. */
            public datetime: (number|Long);

            /** CommonMsg source. */
            public source?: (dtalk.proto.ISource|null);

            /** CommonMsg reference. */
            public reference?: (dtalk.proto.IReference|null);

            /**
             * Encodes the specified CommonMsg message. Does not implicitly {@link dtalk.proto.CommonMsg.verify|verify} messages.
             * @param message CommonMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ICommonMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CommonMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.CommonMsg;

            /**
             * Creates a CommonMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommonMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.CommonMsg;

            /**
             * Creates a plain object from a CommonMsg message. Also converts values to other types if specified.
             * @param message CommonMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.CommonMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CommonMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CommonMsgAck. */
        interface ICommonMsgAck {

            /** CommonMsgAck logId */
            logId?: (number|Long|null);

            /** CommonMsgAck datetime */
            datetime?: (number|Long|null);
        }

        /** Represents a CommonMsgAck. */
        class CommonMsgAck implements ICommonMsgAck {

            /**
             * Constructs a new CommonMsgAck.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ICommonMsgAck);

            /** CommonMsgAck logId. */
            public logId: (number|Long);

            /** CommonMsgAck datetime. */
            public datetime: (number|Long);

            /**
             * Encodes the specified CommonMsgAck message. Does not implicitly {@link dtalk.proto.CommonMsgAck.verify|verify} messages.
             * @param message CommonMsgAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ICommonMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CommonMsgAck message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommonMsgAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.CommonMsgAck;

            /**
             * Creates a CommonMsgAck message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommonMsgAck
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.CommonMsgAck;

            /**
             * Creates a plain object from a CommonMsgAck message. Also converts values to other types if specified.
             * @param message CommonMsgAck
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.CommonMsgAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CommonMsgAck to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EncryptMsg. */
        interface IEncryptMsg {

            /** EncryptMsg content */
            content?: (string|null);
        }

        /** Represents an EncryptMsg. */
        class EncryptMsg implements IEncryptMsg {

            /**
             * Constructs a new EncryptMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IEncryptMsg);

            /** EncryptMsg content. */
            public content: string;

            /**
             * Encodes the specified EncryptMsg message. Does not implicitly {@link dtalk.proto.EncryptMsg.verify|verify} messages.
             * @param message EncryptMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IEncryptMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EncryptMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EncryptMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.EncryptMsg;

            /**
             * Creates an EncryptMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EncryptMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.EncryptMsg;

            /**
             * Creates a plain object from an EncryptMsg message. Also converts values to other types if specified.
             * @param message EncryptMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.EncryptMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EncryptMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TextMsg. */
        interface ITextMsg {

            /** TextMsg content */
            content?: (string|null);

            /** TextMsg mention */
            mention?: (string[]|null);
        }

        /** Represents a TextMsg. */
        class TextMsg implements ITextMsg {

            /**
             * Constructs a new TextMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ITextMsg);

            /** TextMsg content. */
            public content: string;

            /** TextMsg mention. */
            public mention: string[];

            /**
             * Encodes the specified TextMsg message. Does not implicitly {@link dtalk.proto.TextMsg.verify|verify} messages.
             * @param message TextMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ITextMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TextMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TextMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.TextMsg;

            /**
             * Creates a TextMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TextMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.TextMsg;

            /**
             * Creates a plain object from a TextMsg message. Also converts values to other types if specified.
             * @param message TextMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.TextMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TextMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AudioMsg. */
        interface IAudioMsg {

            /** AudioMsg mediaUrl */
            mediaUrl?: (string|null);

            /** AudioMsg time */
            time?: (number|null);
        }

        /** Represents an AudioMsg. */
        class AudioMsg implements IAudioMsg {

            /**
             * Constructs a new AudioMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAudioMsg);

            /** AudioMsg mediaUrl. */
            public mediaUrl: string;

            /** AudioMsg time. */
            public time: number;

            /**
             * Encodes the specified AudioMsg message. Does not implicitly {@link dtalk.proto.AudioMsg.verify|verify} messages.
             * @param message AudioMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAudioMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AudioMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AudioMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AudioMsg;

            /**
             * Creates an AudioMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AudioMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AudioMsg;

            /**
             * Creates a plain object from an AudioMsg message. Also converts values to other types if specified.
             * @param message AudioMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AudioMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AudioMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ImageMsg. */
        interface IImageMsg {

            /** ImageMsg mediaUrl */
            mediaUrl?: (string|null);

            /** ImageMsg height */
            height?: (number|null);

            /** ImageMsg width */
            width?: (number|null);
        }

        /** Represents an ImageMsg. */
        class ImageMsg implements IImageMsg {

            /**
             * Constructs a new ImageMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IImageMsg);

            /** ImageMsg mediaUrl. */
            public mediaUrl: string;

            /** ImageMsg height. */
            public height: number;

            /** ImageMsg width. */
            public width: number;

            /**
             * Encodes the specified ImageMsg message. Does not implicitly {@link dtalk.proto.ImageMsg.verify|verify} messages.
             * @param message ImageMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IImageMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ImageMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ImageMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ImageMsg;

            /**
             * Creates an ImageMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ImageMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ImageMsg;

            /**
             * Creates a plain object from an ImageMsg message. Also converts values to other types if specified.
             * @param message ImageMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ImageMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ImageMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VideoMsg. */
        interface IVideoMsg {

            /** VideoMsg mediaUrl */
            mediaUrl?: (string|null);

            /** VideoMsg time */
            time?: (number|null);

            /** VideoMsg height */
            height?: (number|null);

            /** VideoMsg width */
            width?: (number|null);
        }

        /** Represents a VideoMsg. */
        class VideoMsg implements IVideoMsg {

            /**
             * Constructs a new VideoMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IVideoMsg);

            /** VideoMsg mediaUrl. */
            public mediaUrl: string;

            /** VideoMsg time. */
            public time: number;

            /** VideoMsg height. */
            public height: number;

            /** VideoMsg width. */
            public width: number;

            /**
             * Encodes the specified VideoMsg message. Does not implicitly {@link dtalk.proto.VideoMsg.verify|verify} messages.
             * @param message VideoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IVideoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VideoMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VideoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.VideoMsg;

            /**
             * Creates a VideoMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VideoMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.VideoMsg;

            /**
             * Creates a plain object from a VideoMsg message. Also converts values to other types if specified.
             * @param message VideoMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.VideoMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VideoMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileMsg. */
        interface IFileMsg {

            /** FileMsg mediaUrl */
            mediaUrl?: (string|null);

            /** FileMsg name */
            name?: (string|null);

            /** FileMsg md5 */
            md5?: (string|null);

            /** FileMsg size */
            size?: (number|Long|null);
        }

        /** Represents a FileMsg. */
        class FileMsg implements IFileMsg {

            /**
             * Constructs a new FileMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IFileMsg);

            /** FileMsg mediaUrl. */
            public mediaUrl: string;

            /** FileMsg name. */
            public name: string;

            /** FileMsg md5. */
            public md5: string;

            /** FileMsg size. */
            public size: (number|Long);

            /**
             * Encodes the specified FileMsg message. Does not implicitly {@link dtalk.proto.FileMsg.verify|verify} messages.
             * @param message FileMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IFileMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.FileMsg;

            /**
             * Creates a FileMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.FileMsg;

            /**
             * Creates a plain object from a FileMsg message. Also converts values to other types if specified.
             * @param message FileMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.FileMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CardMsg. */
        interface ICardMsg {

            /** CardMsg bank */
            bank?: (string|null);

            /** CardMsg name */
            name?: (string|null);

            /** CardMsg account */
            account?: (string|null);
        }

        /** Represents a CardMsg. */
        class CardMsg implements ICardMsg {

            /**
             * Constructs a new CardMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ICardMsg);

            /** CardMsg bank. */
            public bank: string;

            /** CardMsg name. */
            public name: string;

            /** CardMsg account. */
            public account: string;

            /**
             * Encodes the specified CardMsg message. Does not implicitly {@link dtalk.proto.CardMsg.verify|verify} messages.
             * @param message CardMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ICardMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CardMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.CardMsg;

            /**
             * Creates a CardMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CardMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.CardMsg;

            /**
             * Creates a plain object from a CardMsg message. Also converts values to other types if specified.
             * @param message CardMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.CardMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CardMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertMsg. */
        interface IAlertMsg {

            /** AlertMsg type */
            type?: (dtalk.proto.AlertType|null);

            /** AlertMsg body */
            body?: (Uint8Array|null);
        }

        /** Represents an AlertMsg. */
        class AlertMsg implements IAlertMsg {

            /**
             * Constructs a new AlertMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertMsg);

            /** AlertMsg type. */
            public type: dtalk.proto.AlertType;

            /** AlertMsg body. */
            public body: Uint8Array;

            /**
             * Encodes the specified AlertMsg message. Does not implicitly {@link dtalk.proto.AlertMsg.verify|verify} messages.
             * @param message AlertMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertMsg;

            /**
             * Creates an AlertMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertMsg;

            /**
             * Creates a plain object from an AlertMsg message. Also converts values to other types if specified.
             * @param message AlertMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ForwardMsg. */
        interface IForwardMsg {

            /** ForwardMsg items */
            items?: (dtalk.proto.IForwardItem[]|null);
        }

        /** Represents a ForwardMsg. */
        class ForwardMsg implements IForwardMsg {

            /**
             * Constructs a new ForwardMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IForwardMsg);

            /** ForwardMsg items. */
            public items: dtalk.proto.IForwardItem[];

            /**
             * Encodes the specified ForwardMsg message. Does not implicitly {@link dtalk.proto.ForwardMsg.verify|verify} messages.
             * @param message ForwardMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IForwardMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ForwardMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ForwardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ForwardMsg;

            /**
             * Creates a ForwardMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ForwardMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ForwardMsg;

            /**
             * Creates a plain object from a ForwardMsg message. Also converts values to other types if specified.
             * @param message ForwardMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ForwardMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ForwardMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ForwardItem. */
        interface IForwardItem {

            /** ForwardItem avatar */
            avatar?: (string|null);

            /** ForwardItem name */
            name?: (string|null);

            /** ForwardItem msgType */
            msgType?: (number|null);

            /** ForwardItem msg */
            msg?: (Uint8Array|null);

            /** ForwardItem datetime */
            datetime?: (number|Long|null);
        }

        /** Represents a ForwardItem. */
        class ForwardItem implements IForwardItem {

            /**
             * Constructs a new ForwardItem.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IForwardItem);

            /** ForwardItem avatar. */
            public avatar: string;

            /** ForwardItem name. */
            public name: string;

            /** ForwardItem msgType. */
            public msgType: number;

            /** ForwardItem msg. */
            public msg: Uint8Array;

            /** ForwardItem datetime. */
            public datetime: (number|Long);

            /**
             * Encodes the specified ForwardItem message. Does not implicitly {@link dtalk.proto.ForwardItem.verify|verify} messages.
             * @param message ForwardItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IForwardItem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ForwardItem message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ForwardItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ForwardItem;

            /**
             * Creates a ForwardItem message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ForwardItem
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ForwardItem;

            /**
             * Creates a plain object from a ForwardItem message. Also converts values to other types if specified.
             * @param message ForwardItem
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ForwardItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ForwardItem to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TransferMsg. */
        interface ITransferMsg {

            /** TransferMsg txHash */
            txHash?: (string|null);

            /** TransferMsg coinName */
            coinName?: (string|null);
        }

        /** Represents a TransferMsg. */
        class TransferMsg implements ITransferMsg {

            /**
             * Constructs a new TransferMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ITransferMsg);

            /** TransferMsg txHash. */
            public txHash: string;

            /** TransferMsg coinName. */
            public coinName: string;

            /**
             * Encodes the specified TransferMsg message. Does not implicitly {@link dtalk.proto.TransferMsg.verify|verify} messages.
             * @param message TransferMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ITransferMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TransferMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TransferMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.TransferMsg;

            /**
             * Creates a TransferMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TransferMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.TransferMsg;

            /**
             * Creates a plain object from a TransferMsg message. Also converts values to other types if specified.
             * @param message TransferMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.TransferMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TransferMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** RPType enum. */
        enum RPType {
            RandomAmount = 0,
            IdenticalAmount = 1
        }

        /** Properties of a RedPacketMsg. */
        interface IRedPacketMsg {

            /** RedPacketMsg txHash */
            txHash?: (string|null);

            /** RedPacketMsg coinName */
            coinName?: (string|null);

            /** RedPacketMsg exec */
            exec?: (string|null);

            /** RedPacketMsg packetType */
            packetType?: (dtalk.proto.RPType|null);

            /** RedPacketMsg privateKey */
            privateKey?: (string|null);

            /** RedPacketMsg remark */
            remark?: (string|null);

            /** RedPacketMsg expire */
            expire?: (number|Long|null);
        }

        /** Represents a RedPacketMsg. */
        class RedPacketMsg implements IRedPacketMsg {

            /**
             * Constructs a new RedPacketMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IRedPacketMsg);

            /** RedPacketMsg txHash. */
            public txHash: string;

            /** RedPacketMsg coinName. */
            public coinName: string;

            /** RedPacketMsg exec. */
            public exec: string;

            /** RedPacketMsg packetType. */
            public packetType: dtalk.proto.RPType;

            /** RedPacketMsg privateKey. */
            public privateKey: string;

            /** RedPacketMsg remark. */
            public remark: string;

            /** RedPacketMsg expire. */
            public expire: (number|Long);

            /**
             * Encodes the specified RedPacketMsg message. Does not implicitly {@link dtalk.proto.RedPacketMsg.verify|verify} messages.
             * @param message RedPacketMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IRedPacketMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RedPacketMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RedPacketMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.RedPacketMsg;

            /**
             * Creates a RedPacketMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RedPacketMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.RedPacketMsg;

            /**
             * Creates a plain object from a RedPacketMsg message. Also converts values to other types if specified.
             * @param message RedPacketMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.RedPacketMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RedPacketMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** CardType enum. */
        enum CardType {
            Undefined = 0,
            Personal = 1
        }

        /** Properties of a ContactCardMsg. */
        interface IContactCardMsg {

            /** ContactCardMsg type */
            type?: (dtalk.proto.CardType|null);

            /** ContactCardMsg id */
            id?: (string|null);

            /** ContactCardMsg name */
            name?: (string|null);

            /** ContactCardMsg avatar */
            avatar?: (string|null);
        }

        /** Represents a ContactCardMsg. */
        class ContactCardMsg implements IContactCardMsg {

            /**
             * Constructs a new ContactCardMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IContactCardMsg);

            /** ContactCardMsg type. */
            public type: dtalk.proto.CardType;

            /** ContactCardMsg id. */
            public id: string;

            /** ContactCardMsg name. */
            public name: string;

            /** ContactCardMsg avatar. */
            public avatar: string;

            /**
             * Encodes the specified ContactCardMsg message. Does not implicitly {@link dtalk.proto.ContactCardMsg.verify|verify} messages.
             * @param message ContactCardMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IContactCardMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ContactCardMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ContactCardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ContactCardMsg;

            /**
             * Creates a ContactCardMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ContactCardMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ContactCardMsg;

            /**
             * Creates a plain object from a ContactCardMsg message. Also converts values to other types if specified.
             * @param message ContactCardMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ContactCardMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ContactCardMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** AlertType enum. */
        enum AlertType {
            UpdateGroupNameAlert = 0,
            SignInGroupAlert = 1,
            SignOutGroupAlert = 2,
            KickOutGroupAlert = 3,
            DeleteGroupAlert = 4,
            UpdateGroupMutedAlert = 5,
            UpdateGroupMemberMutedAlert = 6,
            UpdateGroupOwnerAlert = 7,
            MsgRevoked = 8
        }

        /** Properties of an AlertUpdateGroupName. */
        interface IAlertUpdateGroupName {

            /** AlertUpdateGroupName group */
            group?: (number|Long|null);

            /** AlertUpdateGroupName operator */
            operator?: (string|null);

            /** AlertUpdateGroupName name */
            name?: (string|null);
        }

        /** Represents an AlertUpdateGroupName. */
        class AlertUpdateGroupName implements IAlertUpdateGroupName {

            /**
             * Constructs a new AlertUpdateGroupName.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertUpdateGroupName);

            /** AlertUpdateGroupName group. */
            public group: (number|Long);

            /** AlertUpdateGroupName operator. */
            public operator: string;

            /** AlertUpdateGroupName name. */
            public name: string;

            /**
             * Encodes the specified AlertUpdateGroupName message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupName.verify|verify} messages.
             * @param message AlertUpdateGroupName message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertUpdateGroupName, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertUpdateGroupName message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertUpdateGroupName
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertUpdateGroupName;

            /**
             * Creates an AlertUpdateGroupName message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertUpdateGroupName
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertUpdateGroupName;

            /**
             * Creates a plain object from an AlertUpdateGroupName message. Also converts values to other types if specified.
             * @param message AlertUpdateGroupName
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertUpdateGroupName, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertUpdateGroupName to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertSignInGroup. */
        interface IAlertSignInGroup {

            /** AlertSignInGroup group */
            group?: (number|Long|null);

            /** AlertSignInGroup inviter */
            inviter?: (string|null);

            /** AlertSignInGroup members */
            members?: (string[]|null);
        }

        /** Represents an AlertSignInGroup. */
        class AlertSignInGroup implements IAlertSignInGroup {

            /**
             * Constructs a new AlertSignInGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertSignInGroup);

            /** AlertSignInGroup group. */
            public group: (number|Long);

            /** AlertSignInGroup inviter. */
            public inviter: string;

            /** AlertSignInGroup members. */
            public members: string[];

            /**
             * Encodes the specified AlertSignInGroup message. Does not implicitly {@link dtalk.proto.AlertSignInGroup.verify|verify} messages.
             * @param message AlertSignInGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertSignInGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertSignInGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertSignInGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertSignInGroup;

            /**
             * Creates an AlertSignInGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertSignInGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertSignInGroup;

            /**
             * Creates a plain object from an AlertSignInGroup message. Also converts values to other types if specified.
             * @param message AlertSignInGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertSignInGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertSignInGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertSignOutGroup. */
        interface IAlertSignOutGroup {

            /** AlertSignOutGroup group */
            group?: (number|Long|null);

            /** AlertSignOutGroup operator */
            operator?: (string|null);
        }

        /** Represents an AlertSignOutGroup. */
        class AlertSignOutGroup implements IAlertSignOutGroup {

            /**
             * Constructs a new AlertSignOutGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertSignOutGroup);

            /** AlertSignOutGroup group. */
            public group: (number|Long);

            /** AlertSignOutGroup operator. */
            public operator: string;

            /**
             * Encodes the specified AlertSignOutGroup message. Does not implicitly {@link dtalk.proto.AlertSignOutGroup.verify|verify} messages.
             * @param message AlertSignOutGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertSignOutGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertSignOutGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertSignOutGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertSignOutGroup;

            /**
             * Creates an AlertSignOutGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertSignOutGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertSignOutGroup;

            /**
             * Creates a plain object from an AlertSignOutGroup message. Also converts values to other types if specified.
             * @param message AlertSignOutGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertSignOutGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertSignOutGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertKickOutGroup. */
        interface IAlertKickOutGroup {

            /** AlertKickOutGroup group */
            group?: (number|Long|null);

            /** AlertKickOutGroup operator */
            operator?: (string|null);

            /** AlertKickOutGroup members */
            members?: (string[]|null);
        }

        /** Represents an AlertKickOutGroup. */
        class AlertKickOutGroup implements IAlertKickOutGroup {

            /**
             * Constructs a new AlertKickOutGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertKickOutGroup);

            /** AlertKickOutGroup group. */
            public group: (number|Long);

            /** AlertKickOutGroup operator. */
            public operator: string;

            /** AlertKickOutGroup members. */
            public members: string[];

            /**
             * Encodes the specified AlertKickOutGroup message. Does not implicitly {@link dtalk.proto.AlertKickOutGroup.verify|verify} messages.
             * @param message AlertKickOutGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertKickOutGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertKickOutGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertKickOutGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertKickOutGroup;

            /**
             * Creates an AlertKickOutGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertKickOutGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertKickOutGroup;

            /**
             * Creates a plain object from an AlertKickOutGroup message. Also converts values to other types if specified.
             * @param message AlertKickOutGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertKickOutGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertKickOutGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertDeleteGroup. */
        interface IAlertDeleteGroup {

            /** AlertDeleteGroup group */
            group?: (number|Long|null);

            /** AlertDeleteGroup operator */
            operator?: (string|null);
        }

        /** Represents an AlertDeleteGroup. */
        class AlertDeleteGroup implements IAlertDeleteGroup {

            /**
             * Constructs a new AlertDeleteGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertDeleteGroup);

            /** AlertDeleteGroup group. */
            public group: (number|Long);

            /** AlertDeleteGroup operator. */
            public operator: string;

            /**
             * Encodes the specified AlertDeleteGroup message. Does not implicitly {@link dtalk.proto.AlertDeleteGroup.verify|verify} messages.
             * @param message AlertDeleteGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertDeleteGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertDeleteGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertDeleteGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertDeleteGroup;

            /**
             * Creates an AlertDeleteGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertDeleteGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertDeleteGroup;

            /**
             * Creates a plain object from an AlertDeleteGroup message. Also converts values to other types if specified.
             * @param message AlertDeleteGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertDeleteGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertDeleteGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertUpdateGroupMuted. */
        interface IAlertUpdateGroupMuted {

            /** AlertUpdateGroupMuted group */
            group?: (number|Long|null);

            /** AlertUpdateGroupMuted operator */
            operator?: (string|null);

            /** AlertUpdateGroupMuted type */
            type?: (dtalk.proto.MuteType|null);
        }

        /** Represents an AlertUpdateGroupMuted. */
        class AlertUpdateGroupMuted implements IAlertUpdateGroupMuted {

            /**
             * Constructs a new AlertUpdateGroupMuted.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertUpdateGroupMuted);

            /** AlertUpdateGroupMuted group. */
            public group: (number|Long);

            /** AlertUpdateGroupMuted operator. */
            public operator: string;

            /** AlertUpdateGroupMuted type. */
            public type: dtalk.proto.MuteType;

            /**
             * Encodes the specified AlertUpdateGroupMuted message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupMuted.verify|verify} messages.
             * @param message AlertUpdateGroupMuted message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertUpdateGroupMuted, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertUpdateGroupMuted message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertUpdateGroupMuted
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertUpdateGroupMuted;

            /**
             * Creates an AlertUpdateGroupMuted message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertUpdateGroupMuted
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertUpdateGroupMuted;

            /**
             * Creates a plain object from an AlertUpdateGroupMuted message. Also converts values to other types if specified.
             * @param message AlertUpdateGroupMuted
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertUpdateGroupMuted, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertUpdateGroupMuted to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertUpdateGroupMemberMutedTime. */
        interface IAlertUpdateGroupMemberMutedTime {

            /** AlertUpdateGroupMemberMutedTime group */
            group?: (number|Long|null);

            /** AlertUpdateGroupMemberMutedTime operator */
            operator?: (string|null);

            /** AlertUpdateGroupMemberMutedTime members */
            members?: (string[]|null);
        }

        /** Represents an AlertUpdateGroupMemberMutedTime. */
        class AlertUpdateGroupMemberMutedTime implements IAlertUpdateGroupMemberMutedTime {

            /**
             * Constructs a new AlertUpdateGroupMemberMutedTime.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertUpdateGroupMemberMutedTime);

            /** AlertUpdateGroupMemberMutedTime group. */
            public group: (number|Long);

            /** AlertUpdateGroupMemberMutedTime operator. */
            public operator: string;

            /** AlertUpdateGroupMemberMutedTime members. */
            public members: string[];

            /**
             * Encodes the specified AlertUpdateGroupMemberMutedTime message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupMemberMutedTime.verify|verify} messages.
             * @param message AlertUpdateGroupMemberMutedTime message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertUpdateGroupMemberMutedTime, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertUpdateGroupMemberMutedTime message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertUpdateGroupMemberMutedTime
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertUpdateGroupMemberMutedTime;

            /**
             * Creates an AlertUpdateGroupMemberMutedTime message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertUpdateGroupMemberMutedTime
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertUpdateGroupMemberMutedTime;

            /**
             * Creates a plain object from an AlertUpdateGroupMemberMutedTime message. Also converts values to other types if specified.
             * @param message AlertUpdateGroupMemberMutedTime
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertUpdateGroupMemberMutedTime, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertUpdateGroupMemberMutedTime to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AlertUpdateGroupOwner. */
        interface IAlertUpdateGroupOwner {

            /** AlertUpdateGroupOwner group */
            group?: (number|Long|null);

            /** AlertUpdateGroupOwner newOwner */
            newOwner?: (string|null);
        }

        /** Represents an AlertUpdateGroupOwner. */
        class AlertUpdateGroupOwner implements IAlertUpdateGroupOwner {

            /**
             * Constructs a new AlertUpdateGroupOwner.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAlertUpdateGroupOwner);

            /** AlertUpdateGroupOwner group. */
            public group: (number|Long);

            /** AlertUpdateGroupOwner newOwner. */
            public newOwner: string;

            /**
             * Encodes the specified AlertUpdateGroupOwner message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupOwner.verify|verify} messages.
             * @param message AlertUpdateGroupOwner message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAlertUpdateGroupOwner, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AlertUpdateGroupOwner message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlertUpdateGroupOwner
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AlertUpdateGroupOwner;

            /**
             * Creates an AlertUpdateGroupOwner message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlertUpdateGroupOwner
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AlertUpdateGroupOwner;

            /**
             * Creates a plain object from an AlertUpdateGroupOwner message. Also converts values to other types if specified.
             * @param message AlertUpdateGroupOwner
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AlertUpdateGroupOwner, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AlertUpdateGroupOwner to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a NotifyMsg. */
        interface INotifyMsg {

            /** NotifyMsg action */
            action?: (dtalk.proto.ActionType|null);

            /** NotifyMsg body */
            body?: (Uint8Array|null);
        }

        /** Represents a NotifyMsg. */
        class NotifyMsg implements INotifyMsg {

            /**
             * Constructs a new NotifyMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.INotifyMsg);

            /** NotifyMsg action. */
            public action: dtalk.proto.ActionType;

            /** NotifyMsg body. */
            public body: Uint8Array;

            /**
             * Encodes the specified NotifyMsg message. Does not implicitly {@link dtalk.proto.NotifyMsg.verify|verify} messages.
             * @param message NotifyMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.INotifyMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NotifyMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NotifyMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.NotifyMsg;

            /**
             * Creates a NotifyMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NotifyMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.NotifyMsg;

            /**
             * Creates a plain object from a NotifyMsg message. Also converts values to other types if specified.
             * @param message NotifyMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.NotifyMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NotifyMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** ActionType enum. */
        enum ActionType {
            Received = 0,
            Revoke = 1,
            SignInGroup = 10,
            SignOutGroup = 11,
            DeleteGroup = 12,
            UpdateGroupJoinType = 20,
            UpdateGroupFriendType = 21,
            UpdateGroupMuteType = 22,
            UpdateGroupMemberType = 23,
            UpdateGroupMemberMuteTime = 24,
            UpdateGroupName = 25,
            UpdateGroupAvatar = 26,
            StartCall = 31,
            AcceptCall = 32,
            StopCall = 33
        }

        /** Properties of an ActionReceived. */
        interface IActionReceived {

            /** ActionReceived logs */
            logs?: ((number|Long)[]|null);
        }

        /** Represents an ActionReceived. */
        class ActionReceived implements IActionReceived {

            /**
             * Constructs a new ActionReceived.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionReceived);

            /** ActionReceived logs. */
            public logs: (number|Long)[];

            /**
             * Encodes the specified ActionReceived message. Does not implicitly {@link dtalk.proto.ActionReceived.verify|verify} messages.
             * @param message ActionReceived message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionReceived, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionReceived message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionReceived
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionReceived;

            /**
             * Creates an ActionReceived message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionReceived
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionReceived;

            /**
             * Creates a plain object from an ActionReceived message. Also converts values to other types if specified.
             * @param message ActionReceived
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionReceived, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionReceived to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionSignInGroup. */
        interface IActionSignInGroup {

            /** ActionSignInGroup uid */
            uid?: (string[]|null);

            /** ActionSignInGroup group */
            group?: (number|Long|null);

            /** ActionSignInGroup time */
            time?: (number|Long|null);
        }

        /** Represents an ActionSignInGroup. */
        class ActionSignInGroup implements IActionSignInGroup {

            /**
             * Constructs a new ActionSignInGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionSignInGroup);

            /** ActionSignInGroup uid. */
            public uid: string[];

            /** ActionSignInGroup group. */
            public group: (number|Long);

            /** ActionSignInGroup time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionSignInGroup message. Does not implicitly {@link dtalk.proto.ActionSignInGroup.verify|verify} messages.
             * @param message ActionSignInGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionSignInGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionSignInGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionSignInGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionSignInGroup;

            /**
             * Creates an ActionSignInGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionSignInGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionSignInGroup;

            /**
             * Creates a plain object from an ActionSignInGroup message. Also converts values to other types if specified.
             * @param message ActionSignInGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionSignInGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionSignInGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionSignOutGroup. */
        interface IActionSignOutGroup {

            /** ActionSignOutGroup uid */
            uid?: (string[]|null);

            /** ActionSignOutGroup group */
            group?: (number|Long|null);

            /** ActionSignOutGroup time */
            time?: (number|Long|null);
        }

        /** Represents an ActionSignOutGroup. */
        class ActionSignOutGroup implements IActionSignOutGroup {

            /**
             * Constructs a new ActionSignOutGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionSignOutGroup);

            /** ActionSignOutGroup uid. */
            public uid: string[];

            /** ActionSignOutGroup group. */
            public group: (number|Long);

            /** ActionSignOutGroup time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionSignOutGroup message. Does not implicitly {@link dtalk.proto.ActionSignOutGroup.verify|verify} messages.
             * @param message ActionSignOutGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionSignOutGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionSignOutGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionSignOutGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionSignOutGroup;

            /**
             * Creates an ActionSignOutGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionSignOutGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionSignOutGroup;

            /**
             * Creates a plain object from an ActionSignOutGroup message. Also converts values to other types if specified.
             * @param message ActionSignOutGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionSignOutGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionSignOutGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionDeleteGroup. */
        interface IActionDeleteGroup {

            /** ActionDeleteGroup group */
            group?: (number|Long|null);

            /** ActionDeleteGroup time */
            time?: (number|Long|null);
        }

        /** Represents an ActionDeleteGroup. */
        class ActionDeleteGroup implements IActionDeleteGroup {

            /**
             * Constructs a new ActionDeleteGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionDeleteGroup);

            /** ActionDeleteGroup group. */
            public group: (number|Long);

            /** ActionDeleteGroup time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionDeleteGroup message. Does not implicitly {@link dtalk.proto.ActionDeleteGroup.verify|verify} messages.
             * @param message ActionDeleteGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionDeleteGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionDeleteGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionDeleteGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionDeleteGroup;

            /**
             * Creates an ActionDeleteGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionDeleteGroup
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionDeleteGroup;

            /**
             * Creates a plain object from an ActionDeleteGroup message. Also converts values to other types if specified.
             * @param message ActionDeleteGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionDeleteGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionDeleteGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** JoinType enum. */
        enum JoinType {
            JoinAllow = 0,
            JoinDeny = 1,
            JoinApply = 2
        }

        /** Properties of an ActionUpdateGroupJoinType. */
        interface IActionUpdateGroupJoinType {

            /** ActionUpdateGroupJoinType group */
            group?: (number|Long|null);

            /** ActionUpdateGroupJoinType type */
            type?: (dtalk.proto.JoinType|null);

            /** ActionUpdateGroupJoinType time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupJoinType. */
        class ActionUpdateGroupJoinType implements IActionUpdateGroupJoinType {

            /**
             * Constructs a new ActionUpdateGroupJoinType.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupJoinType);

            /** ActionUpdateGroupJoinType group. */
            public group: (number|Long);

            /** ActionUpdateGroupJoinType type. */
            public type: dtalk.proto.JoinType;

            /** ActionUpdateGroupJoinType time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupJoinType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupJoinType.verify|verify} messages.
             * @param message ActionUpdateGroupJoinType message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupJoinType, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupJoinType message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupJoinType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupJoinType;

            /**
             * Creates an ActionUpdateGroupJoinType message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupJoinType
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupJoinType;

            /**
             * Creates a plain object from an ActionUpdateGroupJoinType message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupJoinType
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupJoinType, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupJoinType to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** FriendType enum. */
        enum FriendType {
            FriendAllow = 0,
            FriendDeny = 1
        }

        /** Properties of an ActionUpdateGroupFriendType. */
        interface IActionUpdateGroupFriendType {

            /** ActionUpdateGroupFriendType group */
            group?: (number|Long|null);

            /** ActionUpdateGroupFriendType type */
            type?: (dtalk.proto.FriendType|null);

            /** ActionUpdateGroupFriendType time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupFriendType. */
        class ActionUpdateGroupFriendType implements IActionUpdateGroupFriendType {

            /**
             * Constructs a new ActionUpdateGroupFriendType.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupFriendType);

            /** ActionUpdateGroupFriendType group. */
            public group: (number|Long);

            /** ActionUpdateGroupFriendType type. */
            public type: dtalk.proto.FriendType;

            /** ActionUpdateGroupFriendType time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupFriendType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupFriendType.verify|verify} messages.
             * @param message ActionUpdateGroupFriendType message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupFriendType, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupFriendType message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupFriendType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupFriendType;

            /**
             * Creates an ActionUpdateGroupFriendType message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupFriendType
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupFriendType;

            /**
             * Creates a plain object from an ActionUpdateGroupFriendType message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupFriendType
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupFriendType, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupFriendType to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** MuteType enum. */
        enum MuteType {
            MuteAllow = 0,
            MuteDeny = 1
        }

        /** Properties of an ActionUpdateGroupMuteType. */
        interface IActionUpdateGroupMuteType {

            /** ActionUpdateGroupMuteType group */
            group?: (number|Long|null);

            /** ActionUpdateGroupMuteType type */
            type?: (dtalk.proto.MuteType|null);

            /** ActionUpdateGroupMuteType time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupMuteType. */
        class ActionUpdateGroupMuteType implements IActionUpdateGroupMuteType {

            /**
             * Constructs a new ActionUpdateGroupMuteType.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupMuteType);

            /** ActionUpdateGroupMuteType group. */
            public group: (number|Long);

            /** ActionUpdateGroupMuteType type. */
            public type: dtalk.proto.MuteType;

            /** ActionUpdateGroupMuteType time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupMuteType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupMuteType.verify|verify} messages.
             * @param message ActionUpdateGroupMuteType message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupMuteType, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupMuteType message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupMuteType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupMuteType;

            /**
             * Creates an ActionUpdateGroupMuteType message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupMuteType
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupMuteType;

            /**
             * Creates a plain object from an ActionUpdateGroupMuteType message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupMuteType
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupMuteType, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupMuteType to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** MemberType enum. */
        enum MemberType {
            Normal = 0,
            Admin = 1,
            Owner = 2
        }

        /** Properties of an ActionUpdateGroupMemberType. */
        interface IActionUpdateGroupMemberType {

            /** ActionUpdateGroupMemberType group */
            group?: (number|Long|null);

            /** ActionUpdateGroupMemberType uid */
            uid?: (string|null);

            /** ActionUpdateGroupMemberType type */
            type?: (dtalk.proto.MemberType|null);

            /** ActionUpdateGroupMemberType time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupMemberType. */
        class ActionUpdateGroupMemberType implements IActionUpdateGroupMemberType {

            /**
             * Constructs a new ActionUpdateGroupMemberType.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupMemberType);

            /** ActionUpdateGroupMemberType group. */
            public group: (number|Long);

            /** ActionUpdateGroupMemberType uid. */
            public uid: string;

            /** ActionUpdateGroupMemberType type. */
            public type: dtalk.proto.MemberType;

            /** ActionUpdateGroupMemberType time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupMemberType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupMemberType.verify|verify} messages.
             * @param message ActionUpdateGroupMemberType message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupMemberType, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupMemberType message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupMemberType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupMemberType;

            /**
             * Creates an ActionUpdateGroupMemberType message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupMemberType
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupMemberType;

            /**
             * Creates a plain object from an ActionUpdateGroupMemberType message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupMemberType
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupMemberType, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupMemberType to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionUpdateGroupMemberMuteTime. */
        interface IActionUpdateGroupMemberMuteTime {

            /** ActionUpdateGroupMemberMuteTime group */
            group?: (number|Long|null);

            /** ActionUpdateGroupMemberMuteTime uid */
            uid?: (string[]|null);

            /** ActionUpdateGroupMemberMuteTime muteTime */
            muteTime?: (number|Long|null);

            /** ActionUpdateGroupMemberMuteTime time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupMemberMuteTime. */
        class ActionUpdateGroupMemberMuteTime implements IActionUpdateGroupMemberMuteTime {

            /**
             * Constructs a new ActionUpdateGroupMemberMuteTime.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupMemberMuteTime);

            /** ActionUpdateGroupMemberMuteTime group. */
            public group: (number|Long);

            /** ActionUpdateGroupMemberMuteTime uid. */
            public uid: string[];

            /** ActionUpdateGroupMemberMuteTime muteTime. */
            public muteTime: (number|Long);

            /** ActionUpdateGroupMemberMuteTime time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupMemberMuteTime message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupMemberMuteTime.verify|verify} messages.
             * @param message ActionUpdateGroupMemberMuteTime message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupMemberMuteTime, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupMemberMuteTime message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupMemberMuteTime
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupMemberMuteTime;

            /**
             * Creates an ActionUpdateGroupMemberMuteTime message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupMemberMuteTime
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupMemberMuteTime;

            /**
             * Creates a plain object from an ActionUpdateGroupMemberMuteTime message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupMemberMuteTime
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupMemberMuteTime, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupMemberMuteTime to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionUpdateGroupName. */
        interface IActionUpdateGroupName {

            /** ActionUpdateGroupName group */
            group?: (number|Long|null);

            /** ActionUpdateGroupName name */
            name?: (string|null);

            /** ActionUpdateGroupName time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupName. */
        class ActionUpdateGroupName implements IActionUpdateGroupName {

            /**
             * Constructs a new ActionUpdateGroupName.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupName);

            /** ActionUpdateGroupName group. */
            public group: (number|Long);

            /** ActionUpdateGroupName name. */
            public name: string;

            /** ActionUpdateGroupName time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupName message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupName.verify|verify} messages.
             * @param message ActionUpdateGroupName message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupName, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupName message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupName
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupName;

            /**
             * Creates an ActionUpdateGroupName message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupName
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupName;

            /**
             * Creates a plain object from an ActionUpdateGroupName message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupName
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupName, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupName to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionUpdateGroupAvatar. */
        interface IActionUpdateGroupAvatar {

            /** ActionUpdateGroupAvatar group */
            group?: (number|Long|null);

            /** ActionUpdateGroupAvatar avatar */
            avatar?: (string|null);

            /** ActionUpdateGroupAvatar time */
            time?: (number|Long|null);
        }

        /** Represents an ActionUpdateGroupAvatar. */
        class ActionUpdateGroupAvatar implements IActionUpdateGroupAvatar {

            /**
             * Constructs a new ActionUpdateGroupAvatar.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionUpdateGroupAvatar);

            /** ActionUpdateGroupAvatar group. */
            public group: (number|Long);

            /** ActionUpdateGroupAvatar avatar. */
            public avatar: string;

            /** ActionUpdateGroupAvatar time. */
            public time: (number|Long);

            /**
             * Encodes the specified ActionUpdateGroupAvatar message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupAvatar.verify|verify} messages.
             * @param message ActionUpdateGroupAvatar message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionUpdateGroupAvatar, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionUpdateGroupAvatar message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionUpdateGroupAvatar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionUpdateGroupAvatar;

            /**
             * Creates an ActionUpdateGroupAvatar message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionUpdateGroupAvatar
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionUpdateGroupAvatar;

            /**
             * Creates a plain object from an ActionUpdateGroupAvatar message. Also converts values to other types if specified.
             * @param message ActionUpdateGroupAvatar
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionUpdateGroupAvatar, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionUpdateGroupAvatar to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionStartCall. */
        interface IActionStartCall {

            /** ActionStartCall traceId */
            traceId?: (number|Long|null);
        }

        /** Represents an ActionStartCall. */
        class ActionStartCall implements IActionStartCall {

            /**
             * Constructs a new ActionStartCall.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionStartCall);

            /** ActionStartCall traceId. */
            public traceId: (number|Long);

            /**
             * Encodes the specified ActionStartCall message. Does not implicitly {@link dtalk.proto.ActionStartCall.verify|verify} messages.
             * @param message ActionStartCall message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionStartCall, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionStartCall message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionStartCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionStartCall;

            /**
             * Creates an ActionStartCall message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionStartCall
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionStartCall;

            /**
             * Creates a plain object from an ActionStartCall message. Also converts values to other types if specified.
             * @param message ActionStartCall
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionStartCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionStartCall to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionAcceptCall. */
        interface IActionAcceptCall {

            /** ActionAcceptCall traceId */
            traceId?: (number|Long|null);

            /** ActionAcceptCall roomId */
            roomId?: (number|null);

            /** ActionAcceptCall uid */
            uid?: (string|null);

            /** ActionAcceptCall userSig */
            userSig?: (string|null);

            /** ActionAcceptCall privateMapKey */
            privateMapKey?: (string|null);

            /** ActionAcceptCall skdAppId */
            skdAppId?: (number|null);
        }

        /** Represents an ActionAcceptCall. */
        class ActionAcceptCall implements IActionAcceptCall {

            /**
             * Constructs a new ActionAcceptCall.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionAcceptCall);

            /** ActionAcceptCall traceId. */
            public traceId: (number|Long);

            /** ActionAcceptCall roomId. */
            public roomId: number;

            /** ActionAcceptCall uid. */
            public uid: string;

            /** ActionAcceptCall userSig. */
            public userSig: string;

            /** ActionAcceptCall privateMapKey. */
            public privateMapKey: string;

            /** ActionAcceptCall skdAppId. */
            public skdAppId: number;

            /**
             * Encodes the specified ActionAcceptCall message. Does not implicitly {@link dtalk.proto.ActionAcceptCall.verify|verify} messages.
             * @param message ActionAcceptCall message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionAcceptCall, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionAcceptCall message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionAcceptCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionAcceptCall;

            /**
             * Creates an ActionAcceptCall message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionAcceptCall
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionAcceptCall;

            /**
             * Creates a plain object from an ActionAcceptCall message. Also converts values to other types if specified.
             * @param message ActionAcceptCall
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionAcceptCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionAcceptCall to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** StopCallType enum. */
        enum StopCallType {
            Busy = 0,
            Timeout = 1,
            Reject = 2,
            Hangup = 3,
            Cancel = 4
        }

        /** Properties of an ActionStopCall. */
        interface IActionStopCall {

            /** ActionStopCall traceId */
            traceId?: (number|Long|null);

            /** ActionStopCall reason */
            reason?: (dtalk.proto.StopCallType|null);
        }

        /** Represents an ActionStopCall. */
        class ActionStopCall implements IActionStopCall {

            /**
             * Constructs a new ActionStopCall.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionStopCall);

            /** ActionStopCall traceId. */
            public traceId: (number|Long);

            /** ActionStopCall reason. */
            public reason: dtalk.proto.StopCallType;

            /**
             * Encodes the specified ActionStopCall message. Does not implicitly {@link dtalk.proto.ActionStopCall.verify|verify} messages.
             * @param message ActionStopCall message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionStopCall, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionStopCall message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionStopCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionStopCall;

            /**
             * Creates an ActionStopCall message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionStopCall
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionStopCall;

            /**
             * Creates a plain object from an ActionStopCall message. Also converts values to other types if specified.
             * @param message ActionStopCall
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionStopCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionStopCall to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionRevoke. */
        interface IActionRevoke {

            /** ActionRevoke logId */
            logId?: (number|Long|null);

            /** ActionRevoke operator */
            operator?: (string|null);

            /** ActionRevoke self */
            self?: (boolean|null);
        }

        /** Represents an ActionRevoke. */
        class ActionRevoke implements IActionRevoke {

            /**
             * Constructs a new ActionRevoke.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IActionRevoke);

            /** ActionRevoke logId. */
            public logId: (number|Long);

            /** ActionRevoke operator. */
            public operator: string;

            /** ActionRevoke self. */
            public self: boolean;

            /**
             * Encodes the specified ActionRevoke message. Does not implicitly {@link dtalk.proto.ActionRevoke.verify|verify} messages.
             * @param message ActionRevoke message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IActionRevoke, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionRevoke message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionRevoke
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ActionRevoke;

            /**
             * Creates an ActionRevoke message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionRevoke
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ActionRevoke;

            /**
             * Creates a plain object from an ActionRevoke message. Also converts values to other types if specified.
             * @param message ActionRevoke
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ActionRevoke, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionRevoke to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
