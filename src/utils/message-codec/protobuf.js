/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const dtalk = $root.dtalk = (() => {

    /**
     * Namespace dtalk.
     * @exports dtalk
     * @namespace
     */
    const dtalk = {};

    dtalk.proto = (function() {

        /**
         * Namespace proto.
         * @memberof dtalk
         * @namespace
         */
        const proto = {};

        /**
         * EventType enum.
         * @name dtalk.proto.EventType
         * @enum {number}
         * @property {number} commonMsg=0 commonMsg value
         * @property {number} commonMsgAck=1 commonMsgAck value
         * @property {number} Notice=2 Notice value
         * @property {number} SYSNotice=3 SYSNotice value
         */
        proto.EventType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "commonMsg"] = 0;
            values[valuesById[1] = "commonMsgAck"] = 1;
            values[valuesById[2] = "Notice"] = 2;
            values[valuesById[3] = "SYSNotice"] = 3;
            return values;
        })();

        proto.Proto = (function() {

            /**
             * Properties of a Proto.
             * @memberof dtalk.proto
             * @interface IProto
             * @property {dtalk.proto.EventType|null} [eventType] Proto eventType
             * @property {Uint8Array|null} [body] Proto body
             */

            /**
             * Constructs a new Proto.
             * @memberof dtalk.proto
             * @classdesc Represents a Proto.
             * @implements IProto
             * @constructor
             * @param {dtalk.proto.IProto=} [properties] Properties to set
             */
            function Proto(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Proto eventType.
             * @member {dtalk.proto.EventType} eventType
             * @memberof dtalk.proto.Proto
             * @instance
             */
            Proto.prototype.eventType = 0;

            /**
             * Proto body.
             * @member {Uint8Array} body
             * @memberof dtalk.proto.Proto
             * @instance
             */
            Proto.prototype.body = $util.newBuffer([]);

            /**
             * Encodes the specified Proto message. Does not implicitly {@link dtalk.proto.Proto.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.Proto
             * @static
             * @param {dtalk.proto.IProto} message Proto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Proto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.eventType);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.body);
                return writer;
            };

            /**
             * Decodes a Proto message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.Proto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.Proto} Proto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Proto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.Proto();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.eventType = reader.int32();
                        break;
                    case 2:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Proto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.Proto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.Proto} Proto
             */
            Proto.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.Proto)
                    return object;
                let message = new $root.dtalk.proto.Proto();
                switch (object.eventType) {
                case "commonMsg":
                case 0:
                    message.eventType = 0;
                    break;
                case "commonMsgAck":
                case 1:
                    message.eventType = 1;
                    break;
                case "Notice":
                case 2:
                    message.eventType = 2;
                    break;
                case "SYSNotice":
                case 3:
                    message.eventType = 3;
                    break;
                }
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from a Proto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.Proto
             * @static
             * @param {dtalk.proto.Proto} message Proto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Proto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.eventType = options.enums === String ? "commonMsg" : 0;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.eventType != null && message.hasOwnProperty("eventType"))
                    object.eventType = options.enums === String ? $root.dtalk.proto.EventType[message.eventType] : message.eventType;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this Proto to JSON.
             * @function toJSON
             * @memberof dtalk.proto.Proto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Proto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Proto;
        })();

        /**
         * Channel enum.
         * @name dtalk.proto.Channel
         * @enum {number}
         * @property {number} ToUser=0 ToUser value
         * @property {number} ToGroup=1 ToGroup value
         */
        proto.Channel = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ToUser"] = 0;
            values[valuesById[1] = "ToGroup"] = 1;
            return values;
        })();

        /**
         * MsgType enum.
         * @name dtalk.proto.MsgType
         * @enum {number}
         * @property {number} System=0 System value
         * @property {number} Text=1 Text value
         * @property {number} Audio=2 Audio value
         * @property {number} Image=3 Image value
         * @property {number} Video=4 Video value
         * @property {number} File=5 File value
         * @property {number} Card=6 Card value
         * @property {number} Alert=7 Alert value
         * @property {number} Forward=8 Forward value
         * @property {number} RTCCall=9 RTCCall value
         * @property {number} Transfer=10 Transfer value
         * @property {number} Collect=11 Collect value
         * @property {number} RedPacket=12 RedPacket value
         * @property {number} ContactCard=13 ContactCard value
         */
        proto.MsgType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "System"] = 0;
            values[valuesById[1] = "Text"] = 1;
            values[valuesById[2] = "Audio"] = 2;
            values[valuesById[3] = "Image"] = 3;
            values[valuesById[4] = "Video"] = 4;
            values[valuesById[5] = "File"] = 5;
            values[valuesById[6] = "Card"] = 6;
            values[valuesById[7] = "Alert"] = 7;
            values[valuesById[8] = "Forward"] = 8;
            values[valuesById[9] = "RTCCall"] = 9;
            values[valuesById[10] = "Transfer"] = 10;
            values[valuesById[11] = "Collect"] = 11;
            values[valuesById[12] = "RedPacket"] = 12;
            values[valuesById[13] = "ContactCard"] = 13;
            return values;
        })();

        proto.SourceUser = (function() {

            /**
             * Properties of a SourceUser.
             * @memberof dtalk.proto
             * @interface ISourceUser
             * @property {string|null} [id] SourceUser id
             * @property {string|null} [name] SourceUser name
             */

            /**
             * Constructs a new SourceUser.
             * @memberof dtalk.proto
             * @classdesc Represents a SourceUser.
             * @implements ISourceUser
             * @constructor
             * @param {dtalk.proto.ISourceUser=} [properties] Properties to set
             */
            function SourceUser(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SourceUser id.
             * @member {string} id
             * @memberof dtalk.proto.SourceUser
             * @instance
             */
            SourceUser.prototype.id = "";

            /**
             * SourceUser name.
             * @member {string} name
             * @memberof dtalk.proto.SourceUser
             * @instance
             */
            SourceUser.prototype.name = "";

            /**
             * Encodes the specified SourceUser message. Does not implicitly {@link dtalk.proto.SourceUser.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.SourceUser
             * @static
             * @param {dtalk.proto.ISourceUser} message SourceUser message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceUser.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Decodes a SourceUser message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.SourceUser
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.SourceUser} SourceUser
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SourceUser.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.SourceUser();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a SourceUser message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.SourceUser
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.SourceUser} SourceUser
             */
            SourceUser.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.SourceUser)
                    return object;
                let message = new $root.dtalk.proto.SourceUser();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a SourceUser message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.SourceUser
             * @static
             * @param {dtalk.proto.SourceUser} message SourceUser
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SourceUser.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this SourceUser to JSON.
             * @function toJSON
             * @memberof dtalk.proto.SourceUser
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SourceUser.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SourceUser;
        })();

        proto.Source = (function() {

            /**
             * Properties of a Source.
             * @memberof dtalk.proto
             * @interface ISource
             * @property {dtalk.proto.Channel|null} [channelType] Source channelType
             * @property {dtalk.proto.ISourceUser|null} [from] Source from
             * @property {dtalk.proto.ISourceUser|null} [target] Source target
             */

            /**
             * Constructs a new Source.
             * @memberof dtalk.proto
             * @classdesc Represents a Source.
             * @implements ISource
             * @constructor
             * @param {dtalk.proto.ISource=} [properties] Properties to set
             */
            function Source(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Source channelType.
             * @member {dtalk.proto.Channel} channelType
             * @memberof dtalk.proto.Source
             * @instance
             */
            Source.prototype.channelType = 0;

            /**
             * Source from.
             * @member {dtalk.proto.ISourceUser|null|undefined} from
             * @memberof dtalk.proto.Source
             * @instance
             */
            Source.prototype.from = null;

            /**
             * Source target.
             * @member {dtalk.proto.ISourceUser|null|undefined} target
             * @memberof dtalk.proto.Source
             * @instance
             */
            Source.prototype.target = null;

            /**
             * Encodes the specified Source message. Does not implicitly {@link dtalk.proto.Source.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.Source
             * @static
             * @param {dtalk.proto.ISource} message Source message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Source.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.channelType != null && Object.hasOwnProperty.call(message, "channelType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.channelType);
                if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                    $root.dtalk.proto.SourceUser.encode(message.from, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                    $root.dtalk.proto.SourceUser.encode(message.target, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Decodes a Source message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.Source
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.Source} Source
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Source.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.Source();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.channelType = reader.int32();
                        break;
                    case 2:
                        message.from = $root.dtalk.proto.SourceUser.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.target = $root.dtalk.proto.SourceUser.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Source message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.Source
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.Source} Source
             */
            Source.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.Source)
                    return object;
                let message = new $root.dtalk.proto.Source();
                switch (object.channelType) {
                case "ToUser":
                case 0:
                    message.channelType = 0;
                    break;
                case "ToGroup":
                case 1:
                    message.channelType = 1;
                    break;
                }
                if (object.from != null) {
                    if (typeof object.from !== "object")
                        throw TypeError(".dtalk.proto.Source.from: object expected");
                    message.from = $root.dtalk.proto.SourceUser.fromObject(object.from);
                }
                if (object.target != null) {
                    if (typeof object.target !== "object")
                        throw TypeError(".dtalk.proto.Source.target: object expected");
                    message.target = $root.dtalk.proto.SourceUser.fromObject(object.target);
                }
                return message;
            };

            /**
             * Creates a plain object from a Source message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.Source
             * @static
             * @param {dtalk.proto.Source} message Source
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Source.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.channelType = options.enums === String ? "ToUser" : 0;
                    object.from = null;
                    object.target = null;
                }
                if (message.channelType != null && message.hasOwnProperty("channelType"))
                    object.channelType = options.enums === String ? $root.dtalk.proto.Channel[message.channelType] : message.channelType;
                if (message.from != null && message.hasOwnProperty("from"))
                    object.from = $root.dtalk.proto.SourceUser.toObject(message.from, options);
                if (message.target != null && message.hasOwnProperty("target"))
                    object.target = $root.dtalk.proto.SourceUser.toObject(message.target, options);
                return object;
            };

            /**
             * Converts this Source to JSON.
             * @function toJSON
             * @memberof dtalk.proto.Source
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Source.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Source;
        })();

        proto.Reference = (function() {

            /**
             * Properties of a Reference.
             * @memberof dtalk.proto
             * @interface IReference
             * @property {number|Long|null} [topic] Reference topic
             * @property {number|Long|null} [ref] Reference ref
             */

            /**
             * Constructs a new Reference.
             * @memberof dtalk.proto
             * @classdesc Represents a Reference.
             * @implements IReference
             * @constructor
             * @param {dtalk.proto.IReference=} [properties] Properties to set
             */
            function Reference(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Reference topic.
             * @member {number|Long} topic
             * @memberof dtalk.proto.Reference
             * @instance
             */
            Reference.prototype.topic = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Reference ref.
             * @member {number|Long} ref
             * @memberof dtalk.proto.Reference
             * @instance
             */
            Reference.prototype.ref = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Encodes the specified Reference message. Does not implicitly {@link dtalk.proto.Reference.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.Reference
             * @static
             * @param {dtalk.proto.IReference} message Reference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Reference.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.topic != null && Object.hasOwnProperty.call(message, "topic"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.topic);
                if (message.ref != null && Object.hasOwnProperty.call(message, "ref"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.ref);
                return writer;
            };

            /**
             * Decodes a Reference message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.Reference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.Reference} Reference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Reference.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.Reference();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.topic = reader.int64();
                        break;
                    case 2:
                        message.ref = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Reference message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.Reference
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.Reference} Reference
             */
            Reference.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.Reference)
                    return object;
                let message = new $root.dtalk.proto.Reference();
                if (object.topic != null)
                    if ($util.Long)
                        (message.topic = $util.Long.fromValue(object.topic)).unsigned = false;
                    else if (typeof object.topic === "string")
                        message.topic = parseInt(object.topic, 10);
                    else if (typeof object.topic === "number")
                        message.topic = object.topic;
                    else if (typeof object.topic === "object")
                        message.topic = new $util.LongBits(object.topic.low >>> 0, object.topic.high >>> 0).toNumber();
                if (object.ref != null)
                    if ($util.Long)
                        (message.ref = $util.Long.fromValue(object.ref)).unsigned = false;
                    else if (typeof object.ref === "string")
                        message.ref = parseInt(object.ref, 10);
                    else if (typeof object.ref === "number")
                        message.ref = object.ref;
                    else if (typeof object.ref === "object")
                        message.ref = new $util.LongBits(object.ref.low >>> 0, object.ref.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a Reference message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.Reference
             * @static
             * @param {dtalk.proto.Reference} message Reference
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Reference.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.topic = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.topic = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.ref = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ref = options.longs === String ? "0" : 0;
                }
                if (message.topic != null && message.hasOwnProperty("topic"))
                    if (typeof message.topic === "number")
                        object.topic = options.longs === String ? String(message.topic) : message.topic;
                    else
                        object.topic = options.longs === String ? $util.Long.prototype.toString.call(message.topic) : options.longs === Number ? new $util.LongBits(message.topic.low >>> 0, message.topic.high >>> 0).toNumber() : message.topic;
                if (message.ref != null && message.hasOwnProperty("ref"))
                    if (typeof message.ref === "number")
                        object.ref = options.longs === String ? String(message.ref) : message.ref;
                    else
                        object.ref = options.longs === String ? $util.Long.prototype.toString.call(message.ref) : options.longs === Number ? new $util.LongBits(message.ref.low >>> 0, message.ref.high >>> 0).toNumber() : message.ref;
                return object;
            };

            /**
             * Converts this Reference to JSON.
             * @function toJSON
             * @memberof dtalk.proto.Reference
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Reference.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Reference;
        })();

        proto.CommonMsg = (function() {

            /**
             * Properties of a CommonMsg.
             * @memberof dtalk.proto
             * @interface ICommonMsg
             * @property {dtalk.proto.Channel|null} [channelType] CommonMsg channelType
             * @property {number|Long|null} [logId] CommonMsg logId
             * @property {string|null} [msgId] CommonMsg msgId
             * @property {string|null} [from] CommonMsg from
             * @property {string|null} [target] CommonMsg target
             * @property {dtalk.proto.MsgType|null} [msgType] CommonMsg msgType
             * @property {Uint8Array|null} [msg] CommonMsg msg
             * @property {number|Long|null} [datetime] CommonMsg datetime
             * @property {dtalk.proto.ISource|null} [source] CommonMsg source
             * @property {dtalk.proto.IReference|null} [reference] CommonMsg reference
             */

            /**
             * Constructs a new CommonMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a CommonMsg.
             * @implements ICommonMsg
             * @constructor
             * @param {dtalk.proto.ICommonMsg=} [properties] Properties to set
             */
            function CommonMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CommonMsg channelType.
             * @member {dtalk.proto.Channel} channelType
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.channelType = 0;

            /**
             * CommonMsg logId.
             * @member {number|Long} logId
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.logId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * CommonMsg msgId.
             * @member {string} msgId
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.msgId = "";

            /**
             * CommonMsg from.
             * @member {string} from
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.from = "";

            /**
             * CommonMsg target.
             * @member {string} target
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.target = "";

            /**
             * CommonMsg msgType.
             * @member {dtalk.proto.MsgType} msgType
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.msgType = 0;

            /**
             * CommonMsg msg.
             * @member {Uint8Array} msg
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.msg = $util.newBuffer([]);

            /**
             * CommonMsg datetime.
             * @member {number|Long} datetime
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.datetime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * CommonMsg source.
             * @member {dtalk.proto.ISource|null|undefined} source
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.source = null;

            /**
             * CommonMsg reference.
             * @member {dtalk.proto.IReference|null|undefined} reference
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.reference = null;

            /**
             * Encodes the specified CommonMsg message. Does not implicitly {@link dtalk.proto.CommonMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {dtalk.proto.ICommonMsg} message CommonMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CommonMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.channelType != null && Object.hasOwnProperty.call(message, "channelType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.channelType);
                if (message.logId != null && Object.hasOwnProperty.call(message, "logId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.logId);
                if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.msgId);
                if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.from);
                if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.target);
                if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.msgType);
                if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                    writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.msg);
                if (message.datetime != null && Object.hasOwnProperty.call(message, "datetime"))
                    writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.datetime);
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    $root.dtalk.proto.Source.encode(message.source, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.reference != null && Object.hasOwnProperty.call(message, "reference"))
                    $root.dtalk.proto.Reference.encode(message.reference, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                return writer;
            };

            /**
             * Decodes a CommonMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.CommonMsg} CommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CommonMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.CommonMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.channelType = reader.int32();
                        break;
                    case 2:
                        message.logId = reader.int64();
                        break;
                    case 3:
                        message.msgId = reader.string();
                        break;
                    case 4:
                        message.from = reader.string();
                        break;
                    case 5:
                        message.target = reader.string();
                        break;
                    case 6:
                        message.msgType = reader.int32();
                        break;
                    case 7:
                        message.msg = reader.bytes();
                        break;
                    case 8:
                        message.datetime = reader.uint64();
                        break;
                    case 9:
                        message.source = $root.dtalk.proto.Source.decode(reader, reader.uint32());
                        break;
                    case 10:
                        message.reference = $root.dtalk.proto.Reference.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CommonMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.CommonMsg} CommonMsg
             */
            CommonMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.CommonMsg)
                    return object;
                let message = new $root.dtalk.proto.CommonMsg();
                switch (object.channelType) {
                case "ToUser":
                case 0:
                    message.channelType = 0;
                    break;
                case "ToGroup":
                case 1:
                    message.channelType = 1;
                    break;
                }
                if (object.logId != null)
                    if ($util.Long)
                        (message.logId = $util.Long.fromValue(object.logId)).unsigned = false;
                    else if (typeof object.logId === "string")
                        message.logId = parseInt(object.logId, 10);
                    else if (typeof object.logId === "number")
                        message.logId = object.logId;
                    else if (typeof object.logId === "object")
                        message.logId = new $util.LongBits(object.logId.low >>> 0, object.logId.high >>> 0).toNumber();
                if (object.msgId != null)
                    message.msgId = String(object.msgId);
                if (object.from != null)
                    message.from = String(object.from);
                if (object.target != null)
                    message.target = String(object.target);
                switch (object.msgType) {
                case "System":
                case 0:
                    message.msgType = 0;
                    break;
                case "Text":
                case 1:
                    message.msgType = 1;
                    break;
                case "Audio":
                case 2:
                    message.msgType = 2;
                    break;
                case "Image":
                case 3:
                    message.msgType = 3;
                    break;
                case "Video":
                case 4:
                    message.msgType = 4;
                    break;
                case "File":
                case 5:
                    message.msgType = 5;
                    break;
                case "Card":
                case 6:
                    message.msgType = 6;
                    break;
                case "Alert":
                case 7:
                    message.msgType = 7;
                    break;
                case "Forward":
                case 8:
                    message.msgType = 8;
                    break;
                case "RTCCall":
                case 9:
                    message.msgType = 9;
                    break;
                case "Transfer":
                case 10:
                    message.msgType = 10;
                    break;
                case "Collect":
                case 11:
                    message.msgType = 11;
                    break;
                case "RedPacket":
                case 12:
                    message.msgType = 12;
                    break;
                case "ContactCard":
                case 13:
                    message.msgType = 13;
                    break;
                }
                if (object.msg != null)
                    if (typeof object.msg === "string")
                        $util.base64.decode(object.msg, message.msg = $util.newBuffer($util.base64.length(object.msg)), 0);
                    else if (object.msg.length)
                        message.msg = object.msg;
                if (object.datetime != null)
                    if ($util.Long)
                        (message.datetime = $util.Long.fromValue(object.datetime)).unsigned = true;
                    else if (typeof object.datetime === "string")
                        message.datetime = parseInt(object.datetime, 10);
                    else if (typeof object.datetime === "number")
                        message.datetime = object.datetime;
                    else if (typeof object.datetime === "object")
                        message.datetime = new $util.LongBits(object.datetime.low >>> 0, object.datetime.high >>> 0).toNumber(true);
                if (object.source != null) {
                    if (typeof object.source !== "object")
                        throw TypeError(".dtalk.proto.CommonMsg.source: object expected");
                    message.source = $root.dtalk.proto.Source.fromObject(object.source);
                }
                if (object.reference != null) {
                    if (typeof object.reference !== "object")
                        throw TypeError(".dtalk.proto.CommonMsg.reference: object expected");
                    message.reference = $root.dtalk.proto.Reference.fromObject(object.reference);
                }
                return message;
            };

            /**
             * Creates a plain object from a CommonMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {dtalk.proto.CommonMsg} message CommonMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CommonMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.channelType = options.enums === String ? "ToUser" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.logId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.logId = options.longs === String ? "0" : 0;
                    object.msgId = "";
                    object.from = "";
                    object.target = "";
                    object.msgType = options.enums === String ? "System" : 0;
                    if (options.bytes === String)
                        object.msg = "";
                    else {
                        object.msg = [];
                        if (options.bytes !== Array)
                            object.msg = $util.newBuffer(object.msg);
                    }
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.datetime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.datetime = options.longs === String ? "0" : 0;
                    object.source = null;
                    object.reference = null;
                }
                if (message.channelType != null && message.hasOwnProperty("channelType"))
                    object.channelType = options.enums === String ? $root.dtalk.proto.Channel[message.channelType] : message.channelType;
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (typeof message.logId === "number")
                        object.logId = options.longs === String ? String(message.logId) : message.logId;
                    else
                        object.logId = options.longs === String ? $util.Long.prototype.toString.call(message.logId) : options.longs === Number ? new $util.LongBits(message.logId.low >>> 0, message.logId.high >>> 0).toNumber() : message.logId;
                if (message.msgId != null && message.hasOwnProperty("msgId"))
                    object.msgId = message.msgId;
                if (message.from != null && message.hasOwnProperty("from"))
                    object.from = message.from;
                if (message.target != null && message.hasOwnProperty("target"))
                    object.target = message.target;
                if (message.msgType != null && message.hasOwnProperty("msgType"))
                    object.msgType = options.enums === String ? $root.dtalk.proto.MsgType[message.msgType] : message.msgType;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = options.bytes === String ? $util.base64.encode(message.msg, 0, message.msg.length) : options.bytes === Array ? Array.prototype.slice.call(message.msg) : message.msg;
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (typeof message.datetime === "number")
                        object.datetime = options.longs === String ? String(message.datetime) : message.datetime;
                    else
                        object.datetime = options.longs === String ? $util.Long.prototype.toString.call(message.datetime) : options.longs === Number ? new $util.LongBits(message.datetime.low >>> 0, message.datetime.high >>> 0).toNumber(true) : message.datetime;
                if (message.source != null && message.hasOwnProperty("source"))
                    object.source = $root.dtalk.proto.Source.toObject(message.source, options);
                if (message.reference != null && message.hasOwnProperty("reference"))
                    object.reference = $root.dtalk.proto.Reference.toObject(message.reference, options);
                return object;
            };

            /**
             * Converts this CommonMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.CommonMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CommonMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CommonMsg;
        })();

        proto.CommonMsgAck = (function() {

            /**
             * Properties of a CommonMsgAck.
             * @memberof dtalk.proto
             * @interface ICommonMsgAck
             * @property {number|Long|null} [logId] CommonMsgAck logId
             * @property {number|Long|null} [datetime] CommonMsgAck datetime
             */

            /**
             * Constructs a new CommonMsgAck.
             * @memberof dtalk.proto
             * @classdesc Represents a CommonMsgAck.
             * @implements ICommonMsgAck
             * @constructor
             * @param {dtalk.proto.ICommonMsgAck=} [properties] Properties to set
             */
            function CommonMsgAck(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CommonMsgAck logId.
             * @member {number|Long} logId
             * @memberof dtalk.proto.CommonMsgAck
             * @instance
             */
            CommonMsgAck.prototype.logId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * CommonMsgAck datetime.
             * @member {number|Long} datetime
             * @memberof dtalk.proto.CommonMsgAck
             * @instance
             */
            CommonMsgAck.prototype.datetime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified CommonMsgAck message. Does not implicitly {@link dtalk.proto.CommonMsgAck.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {dtalk.proto.ICommonMsgAck} message CommonMsgAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CommonMsgAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.logId != null && Object.hasOwnProperty.call(message, "logId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.logId);
                if (message.datetime != null && Object.hasOwnProperty.call(message, "datetime"))
                    writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.datetime);
                return writer;
            };

            /**
             * Decodes a CommonMsgAck message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.CommonMsgAck} CommonMsgAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CommonMsgAck.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.CommonMsgAck();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.logId = reader.int64();
                        break;
                    case 8:
                        message.datetime = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CommonMsgAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.CommonMsgAck} CommonMsgAck
             */
            CommonMsgAck.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.CommonMsgAck)
                    return object;
                let message = new $root.dtalk.proto.CommonMsgAck();
                if (object.logId != null)
                    if ($util.Long)
                        (message.logId = $util.Long.fromValue(object.logId)).unsigned = false;
                    else if (typeof object.logId === "string")
                        message.logId = parseInt(object.logId, 10);
                    else if (typeof object.logId === "number")
                        message.logId = object.logId;
                    else if (typeof object.logId === "object")
                        message.logId = new $util.LongBits(object.logId.low >>> 0, object.logId.high >>> 0).toNumber();
                if (object.datetime != null)
                    if ($util.Long)
                        (message.datetime = $util.Long.fromValue(object.datetime)).unsigned = true;
                    else if (typeof object.datetime === "string")
                        message.datetime = parseInt(object.datetime, 10);
                    else if (typeof object.datetime === "number")
                        message.datetime = object.datetime;
                    else if (typeof object.datetime === "object")
                        message.datetime = new $util.LongBits(object.datetime.low >>> 0, object.datetime.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a CommonMsgAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {dtalk.proto.CommonMsgAck} message CommonMsgAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CommonMsgAck.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.logId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.logId = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.datetime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.datetime = options.longs === String ? "0" : 0;
                }
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (typeof message.logId === "number")
                        object.logId = options.longs === String ? String(message.logId) : message.logId;
                    else
                        object.logId = options.longs === String ? $util.Long.prototype.toString.call(message.logId) : options.longs === Number ? new $util.LongBits(message.logId.low >>> 0, message.logId.high >>> 0).toNumber() : message.logId;
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (typeof message.datetime === "number")
                        object.datetime = options.longs === String ? String(message.datetime) : message.datetime;
                    else
                        object.datetime = options.longs === String ? $util.Long.prototype.toString.call(message.datetime) : options.longs === Number ? new $util.LongBits(message.datetime.low >>> 0, message.datetime.high >>> 0).toNumber(true) : message.datetime;
                return object;
            };

            /**
             * Converts this CommonMsgAck to JSON.
             * @function toJSON
             * @memberof dtalk.proto.CommonMsgAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CommonMsgAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CommonMsgAck;
        })();

        proto.EncryptMsg = (function() {

            /**
             * Properties of an EncryptMsg.
             * @memberof dtalk.proto
             * @interface IEncryptMsg
             * @property {string|null} [content] EncryptMsg content
             */

            /**
             * Constructs a new EncryptMsg.
             * @memberof dtalk.proto
             * @classdesc Represents an EncryptMsg.
             * @implements IEncryptMsg
             * @constructor
             * @param {dtalk.proto.IEncryptMsg=} [properties] Properties to set
             */
            function EncryptMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EncryptMsg content.
             * @member {string} content
             * @memberof dtalk.proto.EncryptMsg
             * @instance
             */
            EncryptMsg.prototype.content = "";

            /**
             * Encodes the specified EncryptMsg message. Does not implicitly {@link dtalk.proto.EncryptMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.EncryptMsg
             * @static
             * @param {dtalk.proto.IEncryptMsg} message EncryptMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EncryptMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
                return writer;
            };

            /**
             * Decodes an EncryptMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.EncryptMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.EncryptMsg} EncryptMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EncryptMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.EncryptMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.content = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an EncryptMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.EncryptMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.EncryptMsg} EncryptMsg
             */
            EncryptMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.EncryptMsg)
                    return object;
                let message = new $root.dtalk.proto.EncryptMsg();
                if (object.content != null)
                    message.content = String(object.content);
                return message;
            };

            /**
             * Creates a plain object from an EncryptMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.EncryptMsg
             * @static
             * @param {dtalk.proto.EncryptMsg} message EncryptMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EncryptMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.content = "";
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                return object;
            };

            /**
             * Converts this EncryptMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.EncryptMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EncryptMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EncryptMsg;
        })();

        proto.TextMsg = (function() {

            /**
             * Properties of a TextMsg.
             * @memberof dtalk.proto
             * @interface ITextMsg
             * @property {string|null} [content] TextMsg content
             * @property {Array.<string>|null} [mention] TextMsg mention
             */

            /**
             * Constructs a new TextMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a TextMsg.
             * @implements ITextMsg
             * @constructor
             * @param {dtalk.proto.ITextMsg=} [properties] Properties to set
             */
            function TextMsg(properties) {
                this.mention = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TextMsg content.
             * @member {string} content
             * @memberof dtalk.proto.TextMsg
             * @instance
             */
            TextMsg.prototype.content = "";

            /**
             * TextMsg mention.
             * @member {Array.<string>} mention
             * @memberof dtalk.proto.TextMsg
             * @instance
             */
            TextMsg.prototype.mention = $util.emptyArray;

            /**
             * Encodes the specified TextMsg message. Does not implicitly {@link dtalk.proto.TextMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {dtalk.proto.ITextMsg} message TextMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TextMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
                if (message.mention != null && message.mention.length)
                    for (let i = 0; i < message.mention.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.mention[i]);
                return writer;
            };

            /**
             * Decodes a TextMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.TextMsg} TextMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TextMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.TextMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.content = reader.string();
                        break;
                    case 2:
                        if (!(message.mention && message.mention.length))
                            message.mention = [];
                        message.mention.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a TextMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.TextMsg} TextMsg
             */
            TextMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.TextMsg)
                    return object;
                let message = new $root.dtalk.proto.TextMsg();
                if (object.content != null)
                    message.content = String(object.content);
                if (object.mention) {
                    if (!Array.isArray(object.mention))
                        throw TypeError(".dtalk.proto.TextMsg.mention: array expected");
                    message.mention = [];
                    for (let i = 0; i < object.mention.length; ++i)
                        message.mention[i] = String(object.mention[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a TextMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {dtalk.proto.TextMsg} message TextMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TextMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.mention = [];
                if (options.defaults)
                    object.content = "";
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                if (message.mention && message.mention.length) {
                    object.mention = [];
                    for (let j = 0; j < message.mention.length; ++j)
                        object.mention[j] = message.mention[j];
                }
                return object;
            };

            /**
             * Converts this TextMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.TextMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TextMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TextMsg;
        })();

        proto.AudioMsg = (function() {

            /**
             * Properties of an AudioMsg.
             * @memberof dtalk.proto
             * @interface IAudioMsg
             * @property {string|null} [mediaUrl] AudioMsg mediaUrl
             * @property {number|null} [time] AudioMsg time
             */

            /**
             * Constructs a new AudioMsg.
             * @memberof dtalk.proto
             * @classdesc Represents an AudioMsg.
             * @implements IAudioMsg
             * @constructor
             * @param {dtalk.proto.IAudioMsg=} [properties] Properties to set
             */
            function AudioMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AudioMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.AudioMsg
             * @instance
             */
            AudioMsg.prototype.mediaUrl = "";

            /**
             * AudioMsg time.
             * @member {number} time
             * @memberof dtalk.proto.AudioMsg
             * @instance
             */
            AudioMsg.prototype.time = 0;

            /**
             * Encodes the specified AudioMsg message. Does not implicitly {@link dtalk.proto.AudioMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {dtalk.proto.IAudioMsg} message AudioMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AudioMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.time);
                return writer;
            };

            /**
             * Decodes an AudioMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AudioMsg} AudioMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AudioMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AudioMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.time = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AudioMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AudioMsg} AudioMsg
             */
            AudioMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AudioMsg)
                    return object;
                let message = new $root.dtalk.proto.AudioMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.time != null)
                    message.time = object.time | 0;
                return message;
            };

            /**
             * Creates a plain object from an AudioMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {dtalk.proto.AudioMsg} message AudioMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AudioMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.time = 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.time != null && message.hasOwnProperty("time"))
                    object.time = message.time;
                return object;
            };

            /**
             * Converts this AudioMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AudioMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AudioMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AudioMsg;
        })();

        proto.ImageMsg = (function() {

            /**
             * Properties of an ImageMsg.
             * @memberof dtalk.proto
             * @interface IImageMsg
             * @property {string|null} [mediaUrl] ImageMsg mediaUrl
             * @property {number|null} [height] ImageMsg height
             * @property {number|null} [width] ImageMsg width
             */

            /**
             * Constructs a new ImageMsg.
             * @memberof dtalk.proto
             * @classdesc Represents an ImageMsg.
             * @implements IImageMsg
             * @constructor
             * @param {dtalk.proto.IImageMsg=} [properties] Properties to set
             */
            function ImageMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ImageMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.ImageMsg
             * @instance
             */
            ImageMsg.prototype.mediaUrl = "";

            /**
             * ImageMsg height.
             * @member {number} height
             * @memberof dtalk.proto.ImageMsg
             * @instance
             */
            ImageMsg.prototype.height = 0;

            /**
             * ImageMsg width.
             * @member {number} width
             * @memberof dtalk.proto.ImageMsg
             * @instance
             */
            ImageMsg.prototype.width = 0;

            /**
             * Encodes the specified ImageMsg message. Does not implicitly {@link dtalk.proto.ImageMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {dtalk.proto.IImageMsg} message ImageMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImageMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.height);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.width);
                return writer;
            };

            /**
             * Decodes an ImageMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ImageMsg} ImageMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImageMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ImageMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.height = reader.int32();
                        break;
                    case 3:
                        message.width = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ImageMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ImageMsg} ImageMsg
             */
            ImageMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ImageMsg)
                    return object;
                let message = new $root.dtalk.proto.ImageMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.height != null)
                    message.height = object.height | 0;
                if (object.width != null)
                    message.width = object.width | 0;
                return message;
            };

            /**
             * Creates a plain object from an ImageMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {dtalk.proto.ImageMsg} message ImageMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ImageMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.height = 0;
                    object.width = 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = message.height;
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = message.width;
                return object;
            };

            /**
             * Converts this ImageMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ImageMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ImageMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ImageMsg;
        })();

        proto.VideoMsg = (function() {

            /**
             * Properties of a VideoMsg.
             * @memberof dtalk.proto
             * @interface IVideoMsg
             * @property {string|null} [mediaUrl] VideoMsg mediaUrl
             * @property {number|null} [time] VideoMsg time
             * @property {number|null} [height] VideoMsg height
             * @property {number|null} [width] VideoMsg width
             */

            /**
             * Constructs a new VideoMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a VideoMsg.
             * @implements IVideoMsg
             * @constructor
             * @param {dtalk.proto.IVideoMsg=} [properties] Properties to set
             */
            function VideoMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VideoMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.mediaUrl = "";

            /**
             * VideoMsg time.
             * @member {number} time
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.time = 0;

            /**
             * VideoMsg height.
             * @member {number} height
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.height = 0;

            /**
             * VideoMsg width.
             * @member {number} width
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.width = 0;

            /**
             * Encodes the specified VideoMsg message. Does not implicitly {@link dtalk.proto.VideoMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {dtalk.proto.IVideoMsg} message VideoMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VideoMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.time);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.height);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.width);
                return writer;
            };

            /**
             * Decodes a VideoMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.VideoMsg} VideoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VideoMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.VideoMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.time = reader.int32();
                        break;
                    case 3:
                        message.height = reader.int32();
                        break;
                    case 4:
                        message.width = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a VideoMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.VideoMsg} VideoMsg
             */
            VideoMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.VideoMsg)
                    return object;
                let message = new $root.dtalk.proto.VideoMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.time != null)
                    message.time = object.time | 0;
                if (object.height != null)
                    message.height = object.height | 0;
                if (object.width != null)
                    message.width = object.width | 0;
                return message;
            };

            /**
             * Creates a plain object from a VideoMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {dtalk.proto.VideoMsg} message VideoMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VideoMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.time = 0;
                    object.height = 0;
                    object.width = 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.time != null && message.hasOwnProperty("time"))
                    object.time = message.time;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = message.height;
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = message.width;
                return object;
            };

            /**
             * Converts this VideoMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.VideoMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VideoMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return VideoMsg;
        })();

        proto.FileMsg = (function() {

            /**
             * Properties of a FileMsg.
             * @memberof dtalk.proto
             * @interface IFileMsg
             * @property {string|null} [mediaUrl] FileMsg mediaUrl
             * @property {string|null} [name] FileMsg name
             * @property {string|null} [md5] FileMsg md5
             * @property {number|Long|null} [size] FileMsg size
             */

            /**
             * Constructs a new FileMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a FileMsg.
             * @implements IFileMsg
             * @constructor
             * @param {dtalk.proto.IFileMsg=} [properties] Properties to set
             */
            function FileMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.mediaUrl = "";

            /**
             * FileMsg name.
             * @member {string} name
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.name = "";

            /**
             * FileMsg md5.
             * @member {string} md5
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.md5 = "";

            /**
             * FileMsg size.
             * @member {number|Long} size
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Encodes the specified FileMsg message. Does not implicitly {@link dtalk.proto.FileMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {dtalk.proto.IFileMsg} message FileMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.md5 != null && Object.hasOwnProperty.call(message, "md5"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.md5);
                if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.size);
                return writer;
            };

            /**
             * Decodes a FileMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.FileMsg} FileMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FileMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.FileMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.md5 = reader.string();
                        break;
                    case 4:
                        message.size = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a FileMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.FileMsg} FileMsg
             */
            FileMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.FileMsg)
                    return object;
                let message = new $root.dtalk.proto.FileMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.md5 != null)
                    message.md5 = String(object.md5);
                if (object.size != null)
                    if ($util.Long)
                        (message.size = $util.Long.fromValue(object.size)).unsigned = false;
                    else if (typeof object.size === "string")
                        message.size = parseInt(object.size, 10);
                    else if (typeof object.size === "number")
                        message.size = object.size;
                    else if (typeof object.size === "object")
                        message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a FileMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {dtalk.proto.FileMsg} message FileMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FileMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.name = "";
                    object.md5 = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.size = options.longs === String ? "0" : 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.md5 != null && message.hasOwnProperty("md5"))
                    object.md5 = message.md5;
                if (message.size != null && message.hasOwnProperty("size"))
                    if (typeof message.size === "number")
                        object.size = options.longs === String ? String(message.size) : message.size;
                    else
                        object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                return object;
            };

            /**
             * Converts this FileMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.FileMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FileMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FileMsg;
        })();

        proto.CardMsg = (function() {

            /**
             * Properties of a CardMsg.
             * @memberof dtalk.proto
             * @interface ICardMsg
             * @property {string|null} [bank] CardMsg bank
             * @property {string|null} [name] CardMsg name
             * @property {string|null} [account] CardMsg account
             */

            /**
             * Constructs a new CardMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a CardMsg.
             * @implements ICardMsg
             * @constructor
             * @param {dtalk.proto.ICardMsg=} [properties] Properties to set
             */
            function CardMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CardMsg bank.
             * @member {string} bank
             * @memberof dtalk.proto.CardMsg
             * @instance
             */
            CardMsg.prototype.bank = "";

            /**
             * CardMsg name.
             * @member {string} name
             * @memberof dtalk.proto.CardMsg
             * @instance
             */
            CardMsg.prototype.name = "";

            /**
             * CardMsg account.
             * @member {string} account
             * @memberof dtalk.proto.CardMsg
             * @instance
             */
            CardMsg.prototype.account = "";

            /**
             * Encodes the specified CardMsg message. Does not implicitly {@link dtalk.proto.CardMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {dtalk.proto.ICardMsg} message CardMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CardMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.bank != null && Object.hasOwnProperty.call(message, "bank"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.bank);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.account);
                return writer;
            };

            /**
             * Decodes a CardMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.CardMsg} CardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CardMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.CardMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.bank = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.account = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CardMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.CardMsg} CardMsg
             */
            CardMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.CardMsg)
                    return object;
                let message = new $root.dtalk.proto.CardMsg();
                if (object.bank != null)
                    message.bank = String(object.bank);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.account != null)
                    message.account = String(object.account);
                return message;
            };

            /**
             * Creates a plain object from a CardMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {dtalk.proto.CardMsg} message CardMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CardMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.bank = "";
                    object.name = "";
                    object.account = "";
                }
                if (message.bank != null && message.hasOwnProperty("bank"))
                    object.bank = message.bank;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.account != null && message.hasOwnProperty("account"))
                    object.account = message.account;
                return object;
            };

            /**
             * Converts this CardMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.CardMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CardMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CardMsg;
        })();

        proto.AlertMsg = (function() {

            /**
             * Properties of an AlertMsg.
             * @memberof dtalk.proto
             * @interface IAlertMsg
             * @property {dtalk.proto.AlertType|null} [type] AlertMsg type
             * @property {Uint8Array|null} [body] AlertMsg body
             */

            /**
             * Constructs a new AlertMsg.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertMsg.
             * @implements IAlertMsg
             * @constructor
             * @param {dtalk.proto.IAlertMsg=} [properties] Properties to set
             */
            function AlertMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertMsg type.
             * @member {dtalk.proto.AlertType} type
             * @memberof dtalk.proto.AlertMsg
             * @instance
             */
            AlertMsg.prototype.type = 0;

            /**
             * AlertMsg body.
             * @member {Uint8Array} body
             * @memberof dtalk.proto.AlertMsg
             * @instance
             */
            AlertMsg.prototype.body = $util.newBuffer([]);

            /**
             * Encodes the specified AlertMsg message. Does not implicitly {@link dtalk.proto.AlertMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertMsg
             * @static
             * @param {dtalk.proto.IAlertMsg} message AlertMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.body);
                return writer;
            };

            /**
             * Decodes an AlertMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertMsg} AlertMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertMsg} AlertMsg
             */
            AlertMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertMsg)
                    return object;
                let message = new $root.dtalk.proto.AlertMsg();
                switch (object.type) {
                case "UpdateGroupNameAlert":
                case 0:
                    message.type = 0;
                    break;
                case "SignInGroupAlert":
                case 1:
                    message.type = 1;
                    break;
                case "SignOutGroupAlert":
                case 2:
                    message.type = 2;
                    break;
                case "KickOutGroupAlert":
                case 3:
                    message.type = 3;
                    break;
                case "DeleteGroupAlert":
                case 4:
                    message.type = 4;
                    break;
                case "UpdateGroupMutedAlert":
                case 5:
                    message.type = 5;
                    break;
                case "UpdateGroupMemberMutedAlert":
                case 6:
                    message.type = 6;
                    break;
                case "UpdateGroupOwnerAlert":
                case 7:
                    message.type = 7;
                    break;
                case "MsgRevoked":
                case 8:
                    message.type = 8;
                    break;
                }
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from an AlertMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertMsg
             * @static
             * @param {dtalk.proto.AlertMsg} message AlertMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "UpdateGroupNameAlert" : 0;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.AlertType[message.type] : message.type;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this AlertMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertMsg;
        })();

        proto.ForwardMsg = (function() {

            /**
             * Properties of a ForwardMsg.
             * @memberof dtalk.proto
             * @interface IForwardMsg
             * @property {Array.<dtalk.proto.IForwardItem>|null} [items] ForwardMsg items
             */

            /**
             * Constructs a new ForwardMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a ForwardMsg.
             * @implements IForwardMsg
             * @constructor
             * @param {dtalk.proto.IForwardMsg=} [properties] Properties to set
             */
            function ForwardMsg(properties) {
                this.items = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ForwardMsg items.
             * @member {Array.<dtalk.proto.IForwardItem>} items
             * @memberof dtalk.proto.ForwardMsg
             * @instance
             */
            ForwardMsg.prototype.items = $util.emptyArray;

            /**
             * Encodes the specified ForwardMsg message. Does not implicitly {@link dtalk.proto.ForwardMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ForwardMsg
             * @static
             * @param {dtalk.proto.IForwardMsg} message ForwardMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ForwardMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.items != null && message.items.length)
                    for (let i = 0; i < message.items.length; ++i)
                        $root.dtalk.proto.ForwardItem.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Decodes a ForwardMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ForwardMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ForwardMsg} ForwardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ForwardMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ForwardMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.dtalk.proto.ForwardItem.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a ForwardMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ForwardMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ForwardMsg} ForwardMsg
             */
            ForwardMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ForwardMsg)
                    return object;
                let message = new $root.dtalk.proto.ForwardMsg();
                if (object.items) {
                    if (!Array.isArray(object.items))
                        throw TypeError(".dtalk.proto.ForwardMsg.items: array expected");
                    message.items = [];
                    for (let i = 0; i < object.items.length; ++i) {
                        if (typeof object.items[i] !== "object")
                            throw TypeError(".dtalk.proto.ForwardMsg.items: object expected");
                        message.items[i] = $root.dtalk.proto.ForwardItem.fromObject(object.items[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ForwardMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ForwardMsg
             * @static
             * @param {dtalk.proto.ForwardMsg} message ForwardMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ForwardMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.items = [];
                if (message.items && message.items.length) {
                    object.items = [];
                    for (let j = 0; j < message.items.length; ++j)
                        object.items[j] = $root.dtalk.proto.ForwardItem.toObject(message.items[j], options);
                }
                return object;
            };

            /**
             * Converts this ForwardMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ForwardMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ForwardMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ForwardMsg;
        })();

        proto.ForwardItem = (function() {

            /**
             * Properties of a ForwardItem.
             * @memberof dtalk.proto
             * @interface IForwardItem
             * @property {string|null} [avatar] ForwardItem avatar
             * @property {string|null} [name] ForwardItem name
             * @property {number|null} [msgType] ForwardItem msgType
             * @property {Uint8Array|null} [msg] ForwardItem msg
             * @property {number|Long|null} [datetime] ForwardItem datetime
             */

            /**
             * Constructs a new ForwardItem.
             * @memberof dtalk.proto
             * @classdesc Represents a ForwardItem.
             * @implements IForwardItem
             * @constructor
             * @param {dtalk.proto.IForwardItem=} [properties] Properties to set
             */
            function ForwardItem(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ForwardItem avatar.
             * @member {string} avatar
             * @memberof dtalk.proto.ForwardItem
             * @instance
             */
            ForwardItem.prototype.avatar = "";

            /**
             * ForwardItem name.
             * @member {string} name
             * @memberof dtalk.proto.ForwardItem
             * @instance
             */
            ForwardItem.prototype.name = "";

            /**
             * ForwardItem msgType.
             * @member {number} msgType
             * @memberof dtalk.proto.ForwardItem
             * @instance
             */
            ForwardItem.prototype.msgType = 0;

            /**
             * ForwardItem msg.
             * @member {Uint8Array} msg
             * @memberof dtalk.proto.ForwardItem
             * @instance
             */
            ForwardItem.prototype.msg = $util.newBuffer([]);

            /**
             * ForwardItem datetime.
             * @member {number|Long} datetime
             * @memberof dtalk.proto.ForwardItem
             * @instance
             */
            ForwardItem.prototype.datetime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ForwardItem message. Does not implicitly {@link dtalk.proto.ForwardItem.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ForwardItem
             * @static
             * @param {dtalk.proto.IForwardItem} message ForwardItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ForwardItem.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.avatar);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.msgType);
                if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.msg);
                if (message.datetime != null && Object.hasOwnProperty.call(message, "datetime"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.datetime);
                return writer;
            };

            /**
             * Decodes a ForwardItem message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ForwardItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ForwardItem} ForwardItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ForwardItem.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ForwardItem();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.avatar = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.msgType = reader.int32();
                        break;
                    case 4:
                        message.msg = reader.bytes();
                        break;
                    case 5:
                        message.datetime = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a ForwardItem message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ForwardItem
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ForwardItem} ForwardItem
             */
            ForwardItem.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ForwardItem)
                    return object;
                let message = new $root.dtalk.proto.ForwardItem();
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.msgType != null)
                    message.msgType = object.msgType | 0;
                if (object.msg != null)
                    if (typeof object.msg === "string")
                        $util.base64.decode(object.msg, message.msg = $util.newBuffer($util.base64.length(object.msg)), 0);
                    else if (object.msg.length)
                        message.msg = object.msg;
                if (object.datetime != null)
                    if ($util.Long)
                        (message.datetime = $util.Long.fromValue(object.datetime)).unsigned = true;
                    else if (typeof object.datetime === "string")
                        message.datetime = parseInt(object.datetime, 10);
                    else if (typeof object.datetime === "number")
                        message.datetime = object.datetime;
                    else if (typeof object.datetime === "object")
                        message.datetime = new $util.LongBits(object.datetime.low >>> 0, object.datetime.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a ForwardItem message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ForwardItem
             * @static
             * @param {dtalk.proto.ForwardItem} message ForwardItem
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ForwardItem.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.avatar = "";
                    object.name = "";
                    object.msgType = 0;
                    if (options.bytes === String)
                        object.msg = "";
                    else {
                        object.msg = [];
                        if (options.bytes !== Array)
                            object.msg = $util.newBuffer(object.msg);
                    }
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.datetime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.datetime = options.longs === String ? "0" : 0;
                }
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.msgType != null && message.hasOwnProperty("msgType"))
                    object.msgType = message.msgType;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = options.bytes === String ? $util.base64.encode(message.msg, 0, message.msg.length) : options.bytes === Array ? Array.prototype.slice.call(message.msg) : message.msg;
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (typeof message.datetime === "number")
                        object.datetime = options.longs === String ? String(message.datetime) : message.datetime;
                    else
                        object.datetime = options.longs === String ? $util.Long.prototype.toString.call(message.datetime) : options.longs === Number ? new $util.LongBits(message.datetime.low >>> 0, message.datetime.high >>> 0).toNumber(true) : message.datetime;
                return object;
            };

            /**
             * Converts this ForwardItem to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ForwardItem
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ForwardItem.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ForwardItem;
        })();

        proto.TransferMsg = (function() {

            /**
             * Properties of a TransferMsg.
             * @memberof dtalk.proto
             * @interface ITransferMsg
             * @property {string|null} [txHash] TransferMsg txHash
             * @property {string|null} [coinName] TransferMsg coinName
             */

            /**
             * Constructs a new TransferMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a TransferMsg.
             * @implements ITransferMsg
             * @constructor
             * @param {dtalk.proto.ITransferMsg=} [properties] Properties to set
             */
            function TransferMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransferMsg txHash.
             * @member {string} txHash
             * @memberof dtalk.proto.TransferMsg
             * @instance
             */
            TransferMsg.prototype.txHash = "";

            /**
             * TransferMsg coinName.
             * @member {string} coinName
             * @memberof dtalk.proto.TransferMsg
             * @instance
             */
            TransferMsg.prototype.coinName = "";

            /**
             * Encodes the specified TransferMsg message. Does not implicitly {@link dtalk.proto.TransferMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.TransferMsg
             * @static
             * @param {dtalk.proto.ITransferMsg} message TransferMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransferMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.txHash != null && Object.hasOwnProperty.call(message, "txHash"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.txHash);
                if (message.coinName != null && Object.hasOwnProperty.call(message, "coinName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.coinName);
                return writer;
            };

            /**
             * Decodes a TransferMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.TransferMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.TransferMsg} TransferMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransferMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.TransferMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.txHash = reader.string();
                        break;
                    case 2:
                        message.coinName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a TransferMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.TransferMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.TransferMsg} TransferMsg
             */
            TransferMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.TransferMsg)
                    return object;
                let message = new $root.dtalk.proto.TransferMsg();
                if (object.txHash != null)
                    message.txHash = String(object.txHash);
                if (object.coinName != null)
                    message.coinName = String(object.coinName);
                return message;
            };

            /**
             * Creates a plain object from a TransferMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.TransferMsg
             * @static
             * @param {dtalk.proto.TransferMsg} message TransferMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransferMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.txHash = "";
                    object.coinName = "";
                }
                if (message.txHash != null && message.hasOwnProperty("txHash"))
                    object.txHash = message.txHash;
                if (message.coinName != null && message.hasOwnProperty("coinName"))
                    object.coinName = message.coinName;
                return object;
            };

            /**
             * Converts this TransferMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.TransferMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransferMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TransferMsg;
        })();

        /**
         * RPType enum.
         * @name dtalk.proto.RPType
         * @enum {number}
         * @property {number} RandomAmount=0 RandomAmount value
         * @property {number} IdenticalAmount=1 IdenticalAmount value
         */
        proto.RPType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RandomAmount"] = 0;
            values[valuesById[1] = "IdenticalAmount"] = 1;
            return values;
        })();

        proto.RedPacketMsg = (function() {

            /**
             * Properties of a RedPacketMsg.
             * @memberof dtalk.proto
             * @interface IRedPacketMsg
             * @property {string|null} [txHash] RedPacketMsg txHash
             * @property {string|null} [coinName] RedPacketMsg coinName
             * @property {string|null} [exec] RedPacketMsg exec
             * @property {dtalk.proto.RPType|null} [packetType] RedPacketMsg packetType
             * @property {string|null} [privateKey] RedPacketMsg privateKey
             * @property {string|null} [remark] RedPacketMsg remark
             * @property {number|Long|null} [expire] RedPacketMsg expire
             */

            /**
             * Constructs a new RedPacketMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a RedPacketMsg.
             * @implements IRedPacketMsg
             * @constructor
             * @param {dtalk.proto.IRedPacketMsg=} [properties] Properties to set
             */
            function RedPacketMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RedPacketMsg txHash.
             * @member {string} txHash
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.txHash = "";

            /**
             * RedPacketMsg coinName.
             * @member {string} coinName
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.coinName = "";

            /**
             * RedPacketMsg exec.
             * @member {string} exec
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.exec = "";

            /**
             * RedPacketMsg packetType.
             * @member {dtalk.proto.RPType} packetType
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.packetType = 0;

            /**
             * RedPacketMsg privateKey.
             * @member {string} privateKey
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.privateKey = "";

            /**
             * RedPacketMsg remark.
             * @member {string} remark
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.remark = "";

            /**
             * RedPacketMsg expire.
             * @member {number|Long} expire
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             */
            RedPacketMsg.prototype.expire = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified RedPacketMsg message. Does not implicitly {@link dtalk.proto.RedPacketMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.RedPacketMsg
             * @static
             * @param {dtalk.proto.IRedPacketMsg} message RedPacketMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RedPacketMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.txHash != null && Object.hasOwnProperty.call(message, "txHash"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.txHash);
                if (message.coinName != null && Object.hasOwnProperty.call(message, "coinName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.coinName);
                if (message.exec != null && Object.hasOwnProperty.call(message, "exec"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.exec);
                if (message.packetType != null && Object.hasOwnProperty.call(message, "packetType"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.packetType);
                if (message.privateKey != null && Object.hasOwnProperty.call(message, "privateKey"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.privateKey);
                if (message.remark != null && Object.hasOwnProperty.call(message, "remark"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.remark);
                if (message.expire != null && Object.hasOwnProperty.call(message, "expire"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.expire);
                return writer;
            };

            /**
             * Decodes a RedPacketMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.RedPacketMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.RedPacketMsg} RedPacketMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RedPacketMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.RedPacketMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.txHash = reader.string();
                        break;
                    case 2:
                        message.coinName = reader.string();
                        break;
                    case 3:
                        message.exec = reader.string();
                        break;
                    case 4:
                        message.packetType = reader.int32();
                        break;
                    case 5:
                        message.privateKey = reader.string();
                        break;
                    case 6:
                        message.remark = reader.string();
                        break;
                    case 7:
                        message.expire = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a RedPacketMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.RedPacketMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.RedPacketMsg} RedPacketMsg
             */
            RedPacketMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.RedPacketMsg)
                    return object;
                let message = new $root.dtalk.proto.RedPacketMsg();
                if (object.txHash != null)
                    message.txHash = String(object.txHash);
                if (object.coinName != null)
                    message.coinName = String(object.coinName);
                if (object.exec != null)
                    message.exec = String(object.exec);
                switch (object.packetType) {
                case "RandomAmount":
                case 0:
                    message.packetType = 0;
                    break;
                case "IdenticalAmount":
                case 1:
                    message.packetType = 1;
                    break;
                }
                if (object.privateKey != null)
                    message.privateKey = String(object.privateKey);
                if (object.remark != null)
                    message.remark = String(object.remark);
                if (object.expire != null)
                    if ($util.Long)
                        (message.expire = $util.Long.fromValue(object.expire)).unsigned = true;
                    else if (typeof object.expire === "string")
                        message.expire = parseInt(object.expire, 10);
                    else if (typeof object.expire === "number")
                        message.expire = object.expire;
                    else if (typeof object.expire === "object")
                        message.expire = new $util.LongBits(object.expire.low >>> 0, object.expire.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a RedPacketMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.RedPacketMsg
             * @static
             * @param {dtalk.proto.RedPacketMsg} message RedPacketMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RedPacketMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.txHash = "";
                    object.coinName = "";
                    object.exec = "";
                    object.packetType = options.enums === String ? "RandomAmount" : 0;
                    object.privateKey = "";
                    object.remark = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.expire = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.expire = options.longs === String ? "0" : 0;
                }
                if (message.txHash != null && message.hasOwnProperty("txHash"))
                    object.txHash = message.txHash;
                if (message.coinName != null && message.hasOwnProperty("coinName"))
                    object.coinName = message.coinName;
                if (message.exec != null && message.hasOwnProperty("exec"))
                    object.exec = message.exec;
                if (message.packetType != null && message.hasOwnProperty("packetType"))
                    object.packetType = options.enums === String ? $root.dtalk.proto.RPType[message.packetType] : message.packetType;
                if (message.privateKey != null && message.hasOwnProperty("privateKey"))
                    object.privateKey = message.privateKey;
                if (message.remark != null && message.hasOwnProperty("remark"))
                    object.remark = message.remark;
                if (message.expire != null && message.hasOwnProperty("expire"))
                    if (typeof message.expire === "number")
                        object.expire = options.longs === String ? String(message.expire) : message.expire;
                    else
                        object.expire = options.longs === String ? $util.Long.prototype.toString.call(message.expire) : options.longs === Number ? new $util.LongBits(message.expire.low >>> 0, message.expire.high >>> 0).toNumber(true) : message.expire;
                return object;
            };

            /**
             * Converts this RedPacketMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.RedPacketMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RedPacketMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RedPacketMsg;
        })();

        /**
         * CardType enum.
         * @name dtalk.proto.CardType
         * @enum {number}
         * @property {number} Undefined=0 Undefined value
         * @property {number} Personal=1 Personal value
         */
        proto.CardType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefined"] = 0;
            values[valuesById[1] = "Personal"] = 1;
            return values;
        })();

        proto.ContactCardMsg = (function() {

            /**
             * Properties of a ContactCardMsg.
             * @memberof dtalk.proto
             * @interface IContactCardMsg
             * @property {dtalk.proto.CardType|null} [type] ContactCardMsg type
             * @property {string|null} [id] ContactCardMsg id
             * @property {string|null} [name] ContactCardMsg name
             * @property {string|null} [avatar] ContactCardMsg avatar
             */

            /**
             * Constructs a new ContactCardMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a ContactCardMsg.
             * @implements IContactCardMsg
             * @constructor
             * @param {dtalk.proto.IContactCardMsg=} [properties] Properties to set
             */
            function ContactCardMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ContactCardMsg type.
             * @member {dtalk.proto.CardType} type
             * @memberof dtalk.proto.ContactCardMsg
             * @instance
             */
            ContactCardMsg.prototype.type = 0;

            /**
             * ContactCardMsg id.
             * @member {string} id
             * @memberof dtalk.proto.ContactCardMsg
             * @instance
             */
            ContactCardMsg.prototype.id = "";

            /**
             * ContactCardMsg name.
             * @member {string} name
             * @memberof dtalk.proto.ContactCardMsg
             * @instance
             */
            ContactCardMsg.prototype.name = "";

            /**
             * ContactCardMsg avatar.
             * @member {string} avatar
             * @memberof dtalk.proto.ContactCardMsg
             * @instance
             */
            ContactCardMsg.prototype.avatar = "";

            /**
             * Encodes the specified ContactCardMsg message. Does not implicitly {@link dtalk.proto.ContactCardMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ContactCardMsg
             * @static
             * @param {dtalk.proto.IContactCardMsg} message ContactCardMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactCardMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.avatar);
                return writer;
            };

            /**
             * Decodes a ContactCardMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ContactCardMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ContactCardMsg} ContactCardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactCardMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ContactCardMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.id = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.avatar = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a ContactCardMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ContactCardMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ContactCardMsg} ContactCardMsg
             */
            ContactCardMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ContactCardMsg)
                    return object;
                let message = new $root.dtalk.proto.ContactCardMsg();
                switch (object.type) {
                case "Undefined":
                case 0:
                    message.type = 0;
                    break;
                case "Personal":
                case 1:
                    message.type = 1;
                    break;
                }
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                return message;
            };

            /**
             * Creates a plain object from a ContactCardMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ContactCardMsg
             * @static
             * @param {dtalk.proto.ContactCardMsg} message ContactCardMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactCardMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "Undefined" : 0;
                    object.id = "";
                    object.name = "";
                    object.avatar = "";
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.CardType[message.type] : message.type;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                return object;
            };

            /**
             * Converts this ContactCardMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ContactCardMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactCardMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ContactCardMsg;
        })();

        /**
         * AlertType enum.
         * @name dtalk.proto.AlertType
         * @enum {number}
         * @property {number} UpdateGroupNameAlert=0 UpdateGroupNameAlert value
         * @property {number} SignInGroupAlert=1 SignInGroupAlert value
         * @property {number} SignOutGroupAlert=2 SignOutGroupAlert value
         * @property {number} KickOutGroupAlert=3 KickOutGroupAlert value
         * @property {number} DeleteGroupAlert=4 DeleteGroupAlert value
         * @property {number} UpdateGroupMutedAlert=5 UpdateGroupMutedAlert value
         * @property {number} UpdateGroupMemberMutedAlert=6 UpdateGroupMemberMutedAlert value
         * @property {number} UpdateGroupOwnerAlert=7 UpdateGroupOwnerAlert value
         * @property {number} MsgRevoked=8 MsgRevoked value
         */
        proto.AlertType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UpdateGroupNameAlert"] = 0;
            values[valuesById[1] = "SignInGroupAlert"] = 1;
            values[valuesById[2] = "SignOutGroupAlert"] = 2;
            values[valuesById[3] = "KickOutGroupAlert"] = 3;
            values[valuesById[4] = "DeleteGroupAlert"] = 4;
            values[valuesById[5] = "UpdateGroupMutedAlert"] = 5;
            values[valuesById[6] = "UpdateGroupMemberMutedAlert"] = 6;
            values[valuesById[7] = "UpdateGroupOwnerAlert"] = 7;
            values[valuesById[8] = "MsgRevoked"] = 8;
            return values;
        })();

        proto.AlertUpdateGroupName = (function() {

            /**
             * Properties of an AlertUpdateGroupName.
             * @memberof dtalk.proto
             * @interface IAlertUpdateGroupName
             * @property {number|Long|null} [group] AlertUpdateGroupName group
             * @property {string|null} [operator] AlertUpdateGroupName operator
             * @property {string|null} [name] AlertUpdateGroupName name
             */

            /**
             * Constructs a new AlertUpdateGroupName.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertUpdateGroupName.
             * @implements IAlertUpdateGroupName
             * @constructor
             * @param {dtalk.proto.IAlertUpdateGroupName=} [properties] Properties to set
             */
            function AlertUpdateGroupName(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertUpdateGroupName group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @instance
             */
            AlertUpdateGroupName.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertUpdateGroupName operator.
             * @member {string} operator
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @instance
             */
            AlertUpdateGroupName.prototype.operator = "";

            /**
             * AlertUpdateGroupName name.
             * @member {string} name
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @instance
             */
            AlertUpdateGroupName.prototype.name = "";

            /**
             * Encodes the specified AlertUpdateGroupName message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupName.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @static
             * @param {dtalk.proto.IAlertUpdateGroupName} message AlertUpdateGroupName message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertUpdateGroupName.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                return writer;
            };

            /**
             * Decodes an AlertUpdateGroupName message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertUpdateGroupName} AlertUpdateGroupName
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertUpdateGroupName.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertUpdateGroupName();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertUpdateGroupName message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertUpdateGroupName} AlertUpdateGroupName
             */
            AlertUpdateGroupName.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertUpdateGroupName)
                    return object;
                let message = new $root.dtalk.proto.AlertUpdateGroupName();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from an AlertUpdateGroupName message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @static
             * @param {dtalk.proto.AlertUpdateGroupName} message AlertUpdateGroupName
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertUpdateGroupName.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.operator = "";
                    object.name = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this AlertUpdateGroupName to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertUpdateGroupName
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertUpdateGroupName.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertUpdateGroupName;
        })();

        proto.AlertSignInGroup = (function() {

            /**
             * Properties of an AlertSignInGroup.
             * @memberof dtalk.proto
             * @interface IAlertSignInGroup
             * @property {number|Long|null} [group] AlertSignInGroup group
             * @property {string|null} [inviter] AlertSignInGroup inviter
             * @property {Array.<string>|null} [members] AlertSignInGroup members
             */

            /**
             * Constructs a new AlertSignInGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertSignInGroup.
             * @implements IAlertSignInGroup
             * @constructor
             * @param {dtalk.proto.IAlertSignInGroup=} [properties] Properties to set
             */
            function AlertSignInGroup(properties) {
                this.members = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertSignInGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertSignInGroup
             * @instance
             */
            AlertSignInGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertSignInGroup inviter.
             * @member {string} inviter
             * @memberof dtalk.proto.AlertSignInGroup
             * @instance
             */
            AlertSignInGroup.prototype.inviter = "";

            /**
             * AlertSignInGroup members.
             * @member {Array.<string>} members
             * @memberof dtalk.proto.AlertSignInGroup
             * @instance
             */
            AlertSignInGroup.prototype.members = $util.emptyArray;

            /**
             * Encodes the specified AlertSignInGroup message. Does not implicitly {@link dtalk.proto.AlertSignInGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertSignInGroup
             * @static
             * @param {dtalk.proto.IAlertSignInGroup} message AlertSignInGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertSignInGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.inviter != null && Object.hasOwnProperty.call(message, "inviter"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.inviter);
                if (message.members != null && message.members.length)
                    for (let i = 0; i < message.members.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.members[i]);
                return writer;
            };

            /**
             * Decodes an AlertSignInGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertSignInGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertSignInGroup} AlertSignInGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertSignInGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertSignInGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.inviter = reader.string();
                        break;
                    case 3:
                        if (!(message.members && message.members.length))
                            message.members = [];
                        message.members.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertSignInGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertSignInGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertSignInGroup} AlertSignInGroup
             */
            AlertSignInGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertSignInGroup)
                    return object;
                let message = new $root.dtalk.proto.AlertSignInGroup();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.inviter != null)
                    message.inviter = String(object.inviter);
                if (object.members) {
                    if (!Array.isArray(object.members))
                        throw TypeError(".dtalk.proto.AlertSignInGroup.members: array expected");
                    message.members = [];
                    for (let i = 0; i < object.members.length; ++i)
                        message.members[i] = String(object.members[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from an AlertSignInGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertSignInGroup
             * @static
             * @param {dtalk.proto.AlertSignInGroup} message AlertSignInGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertSignInGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.members = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.inviter = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.inviter != null && message.hasOwnProperty("inviter"))
                    object.inviter = message.inviter;
                if (message.members && message.members.length) {
                    object.members = [];
                    for (let j = 0; j < message.members.length; ++j)
                        object.members[j] = message.members[j];
                }
                return object;
            };

            /**
             * Converts this AlertSignInGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertSignInGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertSignInGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertSignInGroup;
        })();

        proto.AlertSignOutGroup = (function() {

            /**
             * Properties of an AlertSignOutGroup.
             * @memberof dtalk.proto
             * @interface IAlertSignOutGroup
             * @property {number|Long|null} [group] AlertSignOutGroup group
             * @property {string|null} [operator] AlertSignOutGroup operator
             */

            /**
             * Constructs a new AlertSignOutGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertSignOutGroup.
             * @implements IAlertSignOutGroup
             * @constructor
             * @param {dtalk.proto.IAlertSignOutGroup=} [properties] Properties to set
             */
            function AlertSignOutGroup(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertSignOutGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertSignOutGroup
             * @instance
             */
            AlertSignOutGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertSignOutGroup operator.
             * @member {string} operator
             * @memberof dtalk.proto.AlertSignOutGroup
             * @instance
             */
            AlertSignOutGroup.prototype.operator = "";

            /**
             * Encodes the specified AlertSignOutGroup message. Does not implicitly {@link dtalk.proto.AlertSignOutGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertSignOutGroup
             * @static
             * @param {dtalk.proto.IAlertSignOutGroup} message AlertSignOutGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertSignOutGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                return writer;
            };

            /**
             * Decodes an AlertSignOutGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertSignOutGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertSignOutGroup} AlertSignOutGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertSignOutGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertSignOutGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertSignOutGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertSignOutGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertSignOutGroup} AlertSignOutGroup
             */
            AlertSignOutGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertSignOutGroup)
                    return object;
                let message = new $root.dtalk.proto.AlertSignOutGroup();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                return message;
            };

            /**
             * Creates a plain object from an AlertSignOutGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertSignOutGroup
             * @static
             * @param {dtalk.proto.AlertSignOutGroup} message AlertSignOutGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertSignOutGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.operator = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                return object;
            };

            /**
             * Converts this AlertSignOutGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertSignOutGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertSignOutGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertSignOutGroup;
        })();

        proto.AlertKickOutGroup = (function() {

            /**
             * Properties of an AlertKickOutGroup.
             * @memberof dtalk.proto
             * @interface IAlertKickOutGroup
             * @property {number|Long|null} [group] AlertKickOutGroup group
             * @property {string|null} [operator] AlertKickOutGroup operator
             * @property {Array.<string>|null} [members] AlertKickOutGroup members
             */

            /**
             * Constructs a new AlertKickOutGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertKickOutGroup.
             * @implements IAlertKickOutGroup
             * @constructor
             * @param {dtalk.proto.IAlertKickOutGroup=} [properties] Properties to set
             */
            function AlertKickOutGroup(properties) {
                this.members = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertKickOutGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertKickOutGroup
             * @instance
             */
            AlertKickOutGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertKickOutGroup operator.
             * @member {string} operator
             * @memberof dtalk.proto.AlertKickOutGroup
             * @instance
             */
            AlertKickOutGroup.prototype.operator = "";

            /**
             * AlertKickOutGroup members.
             * @member {Array.<string>} members
             * @memberof dtalk.proto.AlertKickOutGroup
             * @instance
             */
            AlertKickOutGroup.prototype.members = $util.emptyArray;

            /**
             * Encodes the specified AlertKickOutGroup message. Does not implicitly {@link dtalk.proto.AlertKickOutGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertKickOutGroup
             * @static
             * @param {dtalk.proto.IAlertKickOutGroup} message AlertKickOutGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertKickOutGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                if (message.members != null && message.members.length)
                    for (let i = 0; i < message.members.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.members[i]);
                return writer;
            };

            /**
             * Decodes an AlertKickOutGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertKickOutGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertKickOutGroup} AlertKickOutGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertKickOutGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertKickOutGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    case 3:
                        if (!(message.members && message.members.length))
                            message.members = [];
                        message.members.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertKickOutGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertKickOutGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertKickOutGroup} AlertKickOutGroup
             */
            AlertKickOutGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertKickOutGroup)
                    return object;
                let message = new $root.dtalk.proto.AlertKickOutGroup();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                if (object.members) {
                    if (!Array.isArray(object.members))
                        throw TypeError(".dtalk.proto.AlertKickOutGroup.members: array expected");
                    message.members = [];
                    for (let i = 0; i < object.members.length; ++i)
                        message.members[i] = String(object.members[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from an AlertKickOutGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertKickOutGroup
             * @static
             * @param {dtalk.proto.AlertKickOutGroup} message AlertKickOutGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertKickOutGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.members = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.operator = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                if (message.members && message.members.length) {
                    object.members = [];
                    for (let j = 0; j < message.members.length; ++j)
                        object.members[j] = message.members[j];
                }
                return object;
            };

            /**
             * Converts this AlertKickOutGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertKickOutGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertKickOutGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertKickOutGroup;
        })();

        proto.AlertDeleteGroup = (function() {

            /**
             * Properties of an AlertDeleteGroup.
             * @memberof dtalk.proto
             * @interface IAlertDeleteGroup
             * @property {number|Long|null} [group] AlertDeleteGroup group
             * @property {string|null} [operator] AlertDeleteGroup operator
             */

            /**
             * Constructs a new AlertDeleteGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertDeleteGroup.
             * @implements IAlertDeleteGroup
             * @constructor
             * @param {dtalk.proto.IAlertDeleteGroup=} [properties] Properties to set
             */
            function AlertDeleteGroup(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertDeleteGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertDeleteGroup
             * @instance
             */
            AlertDeleteGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertDeleteGroup operator.
             * @member {string} operator
             * @memberof dtalk.proto.AlertDeleteGroup
             * @instance
             */
            AlertDeleteGroup.prototype.operator = "";

            /**
             * Encodes the specified AlertDeleteGroup message. Does not implicitly {@link dtalk.proto.AlertDeleteGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertDeleteGroup
             * @static
             * @param {dtalk.proto.IAlertDeleteGroup} message AlertDeleteGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertDeleteGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                return writer;
            };

            /**
             * Decodes an AlertDeleteGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertDeleteGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertDeleteGroup} AlertDeleteGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertDeleteGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertDeleteGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertDeleteGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertDeleteGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertDeleteGroup} AlertDeleteGroup
             */
            AlertDeleteGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertDeleteGroup)
                    return object;
                let message = new $root.dtalk.proto.AlertDeleteGroup();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                return message;
            };

            /**
             * Creates a plain object from an AlertDeleteGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertDeleteGroup
             * @static
             * @param {dtalk.proto.AlertDeleteGroup} message AlertDeleteGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertDeleteGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.operator = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                return object;
            };

            /**
             * Converts this AlertDeleteGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertDeleteGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertDeleteGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertDeleteGroup;
        })();

        proto.AlertUpdateGroupMuted = (function() {

            /**
             * Properties of an AlertUpdateGroupMuted.
             * @memberof dtalk.proto
             * @interface IAlertUpdateGroupMuted
             * @property {number|Long|null} [group] AlertUpdateGroupMuted group
             * @property {string|null} [operator] AlertUpdateGroupMuted operator
             * @property {dtalk.proto.MuteType|null} [type] AlertUpdateGroupMuted type
             */

            /**
             * Constructs a new AlertUpdateGroupMuted.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertUpdateGroupMuted.
             * @implements IAlertUpdateGroupMuted
             * @constructor
             * @param {dtalk.proto.IAlertUpdateGroupMuted=} [properties] Properties to set
             */
            function AlertUpdateGroupMuted(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertUpdateGroupMuted group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @instance
             */
            AlertUpdateGroupMuted.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertUpdateGroupMuted operator.
             * @member {string} operator
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @instance
             */
            AlertUpdateGroupMuted.prototype.operator = "";

            /**
             * AlertUpdateGroupMuted type.
             * @member {dtalk.proto.MuteType} type
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @instance
             */
            AlertUpdateGroupMuted.prototype.type = 0;

            /**
             * Encodes the specified AlertUpdateGroupMuted message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupMuted.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @static
             * @param {dtalk.proto.IAlertUpdateGroupMuted} message AlertUpdateGroupMuted message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertUpdateGroupMuted.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                return writer;
            };

            /**
             * Decodes an AlertUpdateGroupMuted message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertUpdateGroupMuted} AlertUpdateGroupMuted
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertUpdateGroupMuted.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertUpdateGroupMuted();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    case 3:
                        message.type = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertUpdateGroupMuted message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertUpdateGroupMuted} AlertUpdateGroupMuted
             */
            AlertUpdateGroupMuted.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertUpdateGroupMuted)
                    return object;
                let message = new $root.dtalk.proto.AlertUpdateGroupMuted();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                switch (object.type) {
                case "MuteAllow":
                case 0:
                    message.type = 0;
                    break;
                case "MuteDeny":
                case 1:
                    message.type = 1;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from an AlertUpdateGroupMuted message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @static
             * @param {dtalk.proto.AlertUpdateGroupMuted} message AlertUpdateGroupMuted
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertUpdateGroupMuted.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.operator = "";
                    object.type = options.enums === String ? "MuteAllow" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.MuteType[message.type] : message.type;
                return object;
            };

            /**
             * Converts this AlertUpdateGroupMuted to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertUpdateGroupMuted
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertUpdateGroupMuted.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertUpdateGroupMuted;
        })();

        proto.AlertUpdateGroupMemberMutedTime = (function() {

            /**
             * Properties of an AlertUpdateGroupMemberMutedTime.
             * @memberof dtalk.proto
             * @interface IAlertUpdateGroupMemberMutedTime
             * @property {number|Long|null} [group] AlertUpdateGroupMemberMutedTime group
             * @property {string|null} [operator] AlertUpdateGroupMemberMutedTime operator
             * @property {Array.<string>|null} [members] AlertUpdateGroupMemberMutedTime members
             */

            /**
             * Constructs a new AlertUpdateGroupMemberMutedTime.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertUpdateGroupMemberMutedTime.
             * @implements IAlertUpdateGroupMemberMutedTime
             * @constructor
             * @param {dtalk.proto.IAlertUpdateGroupMemberMutedTime=} [properties] Properties to set
             */
            function AlertUpdateGroupMemberMutedTime(properties) {
                this.members = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertUpdateGroupMemberMutedTime group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @instance
             */
            AlertUpdateGroupMemberMutedTime.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertUpdateGroupMemberMutedTime operator.
             * @member {string} operator
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @instance
             */
            AlertUpdateGroupMemberMutedTime.prototype.operator = "";

            /**
             * AlertUpdateGroupMemberMutedTime members.
             * @member {Array.<string>} members
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @instance
             */
            AlertUpdateGroupMemberMutedTime.prototype.members = $util.emptyArray;

            /**
             * Encodes the specified AlertUpdateGroupMemberMutedTime message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupMemberMutedTime.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @static
             * @param {dtalk.proto.IAlertUpdateGroupMemberMutedTime} message AlertUpdateGroupMemberMutedTime message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertUpdateGroupMemberMutedTime.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                if (message.members != null && message.members.length)
                    for (let i = 0; i < message.members.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.members[i]);
                return writer;
            };

            /**
             * Decodes an AlertUpdateGroupMemberMutedTime message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertUpdateGroupMemberMutedTime} AlertUpdateGroupMemberMutedTime
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertUpdateGroupMemberMutedTime.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertUpdateGroupMemberMutedTime();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    case 3:
                        if (!(message.members && message.members.length))
                            message.members = [];
                        message.members.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertUpdateGroupMemberMutedTime message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertUpdateGroupMemberMutedTime} AlertUpdateGroupMemberMutedTime
             */
            AlertUpdateGroupMemberMutedTime.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertUpdateGroupMemberMutedTime)
                    return object;
                let message = new $root.dtalk.proto.AlertUpdateGroupMemberMutedTime();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                if (object.members) {
                    if (!Array.isArray(object.members))
                        throw TypeError(".dtalk.proto.AlertUpdateGroupMemberMutedTime.members: array expected");
                    message.members = [];
                    for (let i = 0; i < object.members.length; ++i)
                        message.members[i] = String(object.members[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from an AlertUpdateGroupMemberMutedTime message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @static
             * @param {dtalk.proto.AlertUpdateGroupMemberMutedTime} message AlertUpdateGroupMemberMutedTime
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertUpdateGroupMemberMutedTime.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.members = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.operator = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                if (message.members && message.members.length) {
                    object.members = [];
                    for (let j = 0; j < message.members.length; ++j)
                        object.members[j] = message.members[j];
                }
                return object;
            };

            /**
             * Converts this AlertUpdateGroupMemberMutedTime to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertUpdateGroupMemberMutedTime
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertUpdateGroupMemberMutedTime.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertUpdateGroupMemberMutedTime;
        })();

        proto.AlertUpdateGroupOwner = (function() {

            /**
             * Properties of an AlertUpdateGroupOwner.
             * @memberof dtalk.proto
             * @interface IAlertUpdateGroupOwner
             * @property {number|Long|null} [group] AlertUpdateGroupOwner group
             * @property {string|null} [newOwner] AlertUpdateGroupOwner newOwner
             */

            /**
             * Constructs a new AlertUpdateGroupOwner.
             * @memberof dtalk.proto
             * @classdesc Represents an AlertUpdateGroupOwner.
             * @implements IAlertUpdateGroupOwner
             * @constructor
             * @param {dtalk.proto.IAlertUpdateGroupOwner=} [properties] Properties to set
             */
            function AlertUpdateGroupOwner(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlertUpdateGroupOwner group.
             * @member {number|Long} group
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @instance
             */
            AlertUpdateGroupOwner.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AlertUpdateGroupOwner newOwner.
             * @member {string} newOwner
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @instance
             */
            AlertUpdateGroupOwner.prototype.newOwner = "";

            /**
             * Encodes the specified AlertUpdateGroupOwner message. Does not implicitly {@link dtalk.proto.AlertUpdateGroupOwner.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @static
             * @param {dtalk.proto.IAlertUpdateGroupOwner} message AlertUpdateGroupOwner message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlertUpdateGroupOwner.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.newOwner != null && Object.hasOwnProperty.call(message, "newOwner"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.newOwner);
                return writer;
            };

            /**
             * Decodes an AlertUpdateGroupOwner message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AlertUpdateGroupOwner} AlertUpdateGroupOwner
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlertUpdateGroupOwner.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AlertUpdateGroupOwner();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.newOwner = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an AlertUpdateGroupOwner message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AlertUpdateGroupOwner} AlertUpdateGroupOwner
             */
            AlertUpdateGroupOwner.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AlertUpdateGroupOwner)
                    return object;
                let message = new $root.dtalk.proto.AlertUpdateGroupOwner();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.newOwner != null)
                    message.newOwner = String(object.newOwner);
                return message;
            };

            /**
             * Creates a plain object from an AlertUpdateGroupOwner message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @static
             * @param {dtalk.proto.AlertUpdateGroupOwner} message AlertUpdateGroupOwner
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlertUpdateGroupOwner.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.newOwner = "";
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.newOwner != null && message.hasOwnProperty("newOwner"))
                    object.newOwner = message.newOwner;
                return object;
            };

            /**
             * Converts this AlertUpdateGroupOwner to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AlertUpdateGroupOwner
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlertUpdateGroupOwner.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AlertUpdateGroupOwner;
        })();

        proto.NotifyMsg = (function() {

            /**
             * Properties of a NotifyMsg.
             * @memberof dtalk.proto
             * @interface INotifyMsg
             * @property {dtalk.proto.ActionType|null} [action] NotifyMsg action
             * @property {Uint8Array|null} [body] NotifyMsg body
             */

            /**
             * Constructs a new NotifyMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a NotifyMsg.
             * @implements INotifyMsg
             * @constructor
             * @param {dtalk.proto.INotifyMsg=} [properties] Properties to set
             */
            function NotifyMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NotifyMsg action.
             * @member {dtalk.proto.ActionType} action
             * @memberof dtalk.proto.NotifyMsg
             * @instance
             */
            NotifyMsg.prototype.action = 0;

            /**
             * NotifyMsg body.
             * @member {Uint8Array} body
             * @memberof dtalk.proto.NotifyMsg
             * @instance
             */
            NotifyMsg.prototype.body = $util.newBuffer([]);

            /**
             * Encodes the specified NotifyMsg message. Does not implicitly {@link dtalk.proto.NotifyMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.NotifyMsg
             * @static
             * @param {dtalk.proto.INotifyMsg} message NotifyMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NotifyMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.body);
                return writer;
            };

            /**
             * Decodes a NotifyMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.NotifyMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.NotifyMsg} NotifyMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NotifyMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.NotifyMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.action = reader.int32();
                        break;
                    case 2:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a NotifyMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.NotifyMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.NotifyMsg} NotifyMsg
             */
            NotifyMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.NotifyMsg)
                    return object;
                let message = new $root.dtalk.proto.NotifyMsg();
                switch (object.action) {
                case "Received":
                case 0:
                    message.action = 0;
                    break;
                case "Revoke":
                case 1:
                    message.action = 1;
                    break;
                case "SignInGroup":
                case 10:
                    message.action = 10;
                    break;
                case "SignOutGroup":
                case 11:
                    message.action = 11;
                    break;
                case "DeleteGroup":
                case 12:
                    message.action = 12;
                    break;
                case "UpdateGroupJoinType":
                case 20:
                    message.action = 20;
                    break;
                case "UpdateGroupFriendType":
                case 21:
                    message.action = 21;
                    break;
                case "UpdateGroupMuteType":
                case 22:
                    message.action = 22;
                    break;
                case "UpdateGroupMemberType":
                case 23:
                    message.action = 23;
                    break;
                case "UpdateGroupMemberMuteTime":
                case 24:
                    message.action = 24;
                    break;
                case "UpdateGroupName":
                case 25:
                    message.action = 25;
                    break;
                case "UpdateGroupAvatar":
                case 26:
                    message.action = 26;
                    break;
                case "StartCall":
                case 31:
                    message.action = 31;
                    break;
                case "AcceptCall":
                case 32:
                    message.action = 32;
                    break;
                case "StopCall":
                case 33:
                    message.action = 33;
                    break;
                }
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from a NotifyMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.NotifyMsg
             * @static
             * @param {dtalk.proto.NotifyMsg} message NotifyMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NotifyMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.action = options.enums === String ? "Received" : 0;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = options.enums === String ? $root.dtalk.proto.ActionType[message.action] : message.action;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this NotifyMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.NotifyMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NotifyMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NotifyMsg;
        })();

        /**
         * ActionType enum.
         * @name dtalk.proto.ActionType
         * @enum {number}
         * @property {number} Received=0 Received value
         * @property {number} Revoke=1 Revoke value
         * @property {number} SignInGroup=10 SignInGroup value
         * @property {number} SignOutGroup=11 SignOutGroup value
         * @property {number} DeleteGroup=12 DeleteGroup value
         * @property {number} UpdateGroupJoinType=20 UpdateGroupJoinType value
         * @property {number} UpdateGroupFriendType=21 UpdateGroupFriendType value
         * @property {number} UpdateGroupMuteType=22 UpdateGroupMuteType value
         * @property {number} UpdateGroupMemberType=23 UpdateGroupMemberType value
         * @property {number} UpdateGroupMemberMuteTime=24 UpdateGroupMemberMuteTime value
         * @property {number} UpdateGroupName=25 UpdateGroupName value
         * @property {number} UpdateGroupAvatar=26 UpdateGroupAvatar value
         * @property {number} StartCall=31 StartCall value
         * @property {number} AcceptCall=32 AcceptCall value
         * @property {number} StopCall=33 StopCall value
         */
        proto.ActionType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Received"] = 0;
            values[valuesById[1] = "Revoke"] = 1;
            values[valuesById[10] = "SignInGroup"] = 10;
            values[valuesById[11] = "SignOutGroup"] = 11;
            values[valuesById[12] = "DeleteGroup"] = 12;
            values[valuesById[20] = "UpdateGroupJoinType"] = 20;
            values[valuesById[21] = "UpdateGroupFriendType"] = 21;
            values[valuesById[22] = "UpdateGroupMuteType"] = 22;
            values[valuesById[23] = "UpdateGroupMemberType"] = 23;
            values[valuesById[24] = "UpdateGroupMemberMuteTime"] = 24;
            values[valuesById[25] = "UpdateGroupName"] = 25;
            values[valuesById[26] = "UpdateGroupAvatar"] = 26;
            values[valuesById[31] = "StartCall"] = 31;
            values[valuesById[32] = "AcceptCall"] = 32;
            values[valuesById[33] = "StopCall"] = 33;
            return values;
        })();

        proto.ActionReceived = (function() {

            /**
             * Properties of an ActionReceived.
             * @memberof dtalk.proto
             * @interface IActionReceived
             * @property {Array.<number|Long>|null} [logs] ActionReceived logs
             */

            /**
             * Constructs a new ActionReceived.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionReceived.
             * @implements IActionReceived
             * @constructor
             * @param {dtalk.proto.IActionReceived=} [properties] Properties to set
             */
            function ActionReceived(properties) {
                this.logs = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionReceived logs.
             * @member {Array.<number|Long>} logs
             * @memberof dtalk.proto.ActionReceived
             * @instance
             */
            ActionReceived.prototype.logs = $util.emptyArray;

            /**
             * Encodes the specified ActionReceived message. Does not implicitly {@link dtalk.proto.ActionReceived.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionReceived
             * @static
             * @param {dtalk.proto.IActionReceived} message ActionReceived message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionReceived.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.logs != null && message.logs.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (let i = 0; i < message.logs.length; ++i)
                        writer.int64(message.logs[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Decodes an ActionReceived message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionReceived
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionReceived} ActionReceived
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionReceived.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionReceived();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.logs && message.logs.length))
                            message.logs = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.logs.push(reader.int64());
                        } else
                            message.logs.push(reader.int64());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionReceived message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionReceived
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionReceived} ActionReceived
             */
            ActionReceived.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionReceived)
                    return object;
                let message = new $root.dtalk.proto.ActionReceived();
                if (object.logs) {
                    if (!Array.isArray(object.logs))
                        throw TypeError(".dtalk.proto.ActionReceived.logs: array expected");
                    message.logs = [];
                    for (let i = 0; i < object.logs.length; ++i)
                        if ($util.Long)
                            (message.logs[i] = $util.Long.fromValue(object.logs[i])).unsigned = false;
                        else if (typeof object.logs[i] === "string")
                            message.logs[i] = parseInt(object.logs[i], 10);
                        else if (typeof object.logs[i] === "number")
                            message.logs[i] = object.logs[i];
                        else if (typeof object.logs[i] === "object")
                            message.logs[i] = new $util.LongBits(object.logs[i].low >>> 0, object.logs[i].high >>> 0).toNumber();
                }
                return message;
            };

            /**
             * Creates a plain object from an ActionReceived message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionReceived
             * @static
             * @param {dtalk.proto.ActionReceived} message ActionReceived
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionReceived.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.logs = [];
                if (message.logs && message.logs.length) {
                    object.logs = [];
                    for (let j = 0; j < message.logs.length; ++j)
                        if (typeof message.logs[j] === "number")
                            object.logs[j] = options.longs === String ? String(message.logs[j]) : message.logs[j];
                        else
                            object.logs[j] = options.longs === String ? $util.Long.prototype.toString.call(message.logs[j]) : options.longs === Number ? new $util.LongBits(message.logs[j].low >>> 0, message.logs[j].high >>> 0).toNumber() : message.logs[j];
                }
                return object;
            };

            /**
             * Converts this ActionReceived to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionReceived
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionReceived.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionReceived;
        })();

        proto.ActionSignInGroup = (function() {

            /**
             * Properties of an ActionSignInGroup.
             * @memberof dtalk.proto
             * @interface IActionSignInGroup
             * @property {Array.<string>|null} [uid] ActionSignInGroup uid
             * @property {number|Long|null} [group] ActionSignInGroup group
             * @property {number|Long|null} [time] ActionSignInGroup time
             */

            /**
             * Constructs a new ActionSignInGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionSignInGroup.
             * @implements IActionSignInGroup
             * @constructor
             * @param {dtalk.proto.IActionSignInGroup=} [properties] Properties to set
             */
            function ActionSignInGroup(properties) {
                this.uid = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionSignInGroup uid.
             * @member {Array.<string>} uid
             * @memberof dtalk.proto.ActionSignInGroup
             * @instance
             */
            ActionSignInGroup.prototype.uid = $util.emptyArray;

            /**
             * ActionSignInGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionSignInGroup
             * @instance
             */
            ActionSignInGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionSignInGroup time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionSignInGroup
             * @instance
             */
            ActionSignInGroup.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionSignInGroup message. Does not implicitly {@link dtalk.proto.ActionSignInGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionSignInGroup
             * @static
             * @param {dtalk.proto.IActionSignInGroup} message ActionSignInGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionSignInGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.uid.length)
                    for (let i = 0; i < message.uid.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid[i]);
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.group);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionSignInGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionSignInGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionSignInGroup} ActionSignInGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionSignInGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionSignInGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.uid && message.uid.length))
                            message.uid = [];
                        message.uid.push(reader.string());
                        break;
                    case 2:
                        message.group = reader.int64();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionSignInGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionSignInGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionSignInGroup} ActionSignInGroup
             */
            ActionSignInGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionSignInGroup)
                    return object;
                let message = new $root.dtalk.proto.ActionSignInGroup();
                if (object.uid) {
                    if (!Array.isArray(object.uid))
                        throw TypeError(".dtalk.proto.ActionSignInGroup.uid: array expected");
                    message.uid = [];
                    for (let i = 0; i < object.uid.length; ++i)
                        message.uid[i] = String(object.uid[i]);
                }
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionSignInGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionSignInGroup
             * @static
             * @param {dtalk.proto.ActionSignInGroup} message ActionSignInGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionSignInGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uid = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.uid && message.uid.length) {
                    object.uid = [];
                    for (let j = 0; j < message.uid.length; ++j)
                        object.uid[j] = message.uid[j];
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionSignInGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionSignInGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionSignInGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionSignInGroup;
        })();

        proto.ActionSignOutGroup = (function() {

            /**
             * Properties of an ActionSignOutGroup.
             * @memberof dtalk.proto
             * @interface IActionSignOutGroup
             * @property {Array.<string>|null} [uid] ActionSignOutGroup uid
             * @property {number|Long|null} [group] ActionSignOutGroup group
             * @property {number|Long|null} [time] ActionSignOutGroup time
             */

            /**
             * Constructs a new ActionSignOutGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionSignOutGroup.
             * @implements IActionSignOutGroup
             * @constructor
             * @param {dtalk.proto.IActionSignOutGroup=} [properties] Properties to set
             */
            function ActionSignOutGroup(properties) {
                this.uid = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionSignOutGroup uid.
             * @member {Array.<string>} uid
             * @memberof dtalk.proto.ActionSignOutGroup
             * @instance
             */
            ActionSignOutGroup.prototype.uid = $util.emptyArray;

            /**
             * ActionSignOutGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionSignOutGroup
             * @instance
             */
            ActionSignOutGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionSignOutGroup time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionSignOutGroup
             * @instance
             */
            ActionSignOutGroup.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionSignOutGroup message. Does not implicitly {@link dtalk.proto.ActionSignOutGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionSignOutGroup
             * @static
             * @param {dtalk.proto.IActionSignOutGroup} message ActionSignOutGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionSignOutGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.uid.length)
                    for (let i = 0; i < message.uid.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid[i]);
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.group);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionSignOutGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionSignOutGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionSignOutGroup} ActionSignOutGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionSignOutGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionSignOutGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.uid && message.uid.length))
                            message.uid = [];
                        message.uid.push(reader.string());
                        break;
                    case 2:
                        message.group = reader.int64();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionSignOutGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionSignOutGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionSignOutGroup} ActionSignOutGroup
             */
            ActionSignOutGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionSignOutGroup)
                    return object;
                let message = new $root.dtalk.proto.ActionSignOutGroup();
                if (object.uid) {
                    if (!Array.isArray(object.uid))
                        throw TypeError(".dtalk.proto.ActionSignOutGroup.uid: array expected");
                    message.uid = [];
                    for (let i = 0; i < object.uid.length; ++i)
                        message.uid[i] = String(object.uid[i]);
                }
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionSignOutGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionSignOutGroup
             * @static
             * @param {dtalk.proto.ActionSignOutGroup} message ActionSignOutGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionSignOutGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uid = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.uid && message.uid.length) {
                    object.uid = [];
                    for (let j = 0; j < message.uid.length; ++j)
                        object.uid[j] = message.uid[j];
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionSignOutGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionSignOutGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionSignOutGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionSignOutGroup;
        })();

        proto.ActionDeleteGroup = (function() {

            /**
             * Properties of an ActionDeleteGroup.
             * @memberof dtalk.proto
             * @interface IActionDeleteGroup
             * @property {number|Long|null} [group] ActionDeleteGroup group
             * @property {number|Long|null} [time] ActionDeleteGroup time
             */

            /**
             * Constructs a new ActionDeleteGroup.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionDeleteGroup.
             * @implements IActionDeleteGroup
             * @constructor
             * @param {dtalk.proto.IActionDeleteGroup=} [properties] Properties to set
             */
            function ActionDeleteGroup(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionDeleteGroup group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionDeleteGroup
             * @instance
             */
            ActionDeleteGroup.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionDeleteGroup time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionDeleteGroup
             * @instance
             */
            ActionDeleteGroup.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionDeleteGroup message. Does not implicitly {@link dtalk.proto.ActionDeleteGroup.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionDeleteGroup
             * @static
             * @param {dtalk.proto.IActionDeleteGroup} message ActionDeleteGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionDeleteGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionDeleteGroup message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionDeleteGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionDeleteGroup} ActionDeleteGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionDeleteGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionDeleteGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionDeleteGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionDeleteGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionDeleteGroup} ActionDeleteGroup
             */
            ActionDeleteGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionDeleteGroup)
                    return object;
                let message = new $root.dtalk.proto.ActionDeleteGroup();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionDeleteGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionDeleteGroup
             * @static
             * @param {dtalk.proto.ActionDeleteGroup} message ActionDeleteGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionDeleteGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionDeleteGroup to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionDeleteGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionDeleteGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionDeleteGroup;
        })();

        /**
         * JoinType enum.
         * @name dtalk.proto.JoinType
         * @enum {number}
         * @property {number} JoinAllow=0 JoinAllow value
         * @property {number} JoinDeny=1 JoinDeny value
         * @property {number} JoinApply=2 JoinApply value
         */
        proto.JoinType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "JoinAllow"] = 0;
            values[valuesById[1] = "JoinDeny"] = 1;
            values[valuesById[2] = "JoinApply"] = 2;
            return values;
        })();

        proto.ActionUpdateGroupJoinType = (function() {

            /**
             * Properties of an ActionUpdateGroupJoinType.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupJoinType
             * @property {number|Long|null} [group] ActionUpdateGroupJoinType group
             * @property {dtalk.proto.JoinType|null} [type] ActionUpdateGroupJoinType type
             * @property {number|Long|null} [time] ActionUpdateGroupJoinType time
             */

            /**
             * Constructs a new ActionUpdateGroupJoinType.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupJoinType.
             * @implements IActionUpdateGroupJoinType
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupJoinType=} [properties] Properties to set
             */
            function ActionUpdateGroupJoinType(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupJoinType group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @instance
             */
            ActionUpdateGroupJoinType.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupJoinType type.
             * @member {dtalk.proto.JoinType} type
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @instance
             */
            ActionUpdateGroupJoinType.prototype.type = 0;

            /**
             * ActionUpdateGroupJoinType time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @instance
             */
            ActionUpdateGroupJoinType.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupJoinType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupJoinType.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @static
             * @param {dtalk.proto.IActionUpdateGroupJoinType} message ActionUpdateGroupJoinType message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupJoinType.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupJoinType message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupJoinType} ActionUpdateGroupJoinType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupJoinType.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupJoinType();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupJoinType message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupJoinType} ActionUpdateGroupJoinType
             */
            ActionUpdateGroupJoinType.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupJoinType)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupJoinType();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                switch (object.type) {
                case "JoinAllow":
                case 0:
                    message.type = 0;
                    break;
                case "JoinDeny":
                case 1:
                    message.type = 1;
                    break;
                case "JoinApply":
                case 2:
                    message.type = 2;
                    break;
                }
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupJoinType message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @static
             * @param {dtalk.proto.ActionUpdateGroupJoinType} message ActionUpdateGroupJoinType
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupJoinType.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.type = options.enums === String ? "JoinAllow" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.JoinType[message.type] : message.type;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupJoinType to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupJoinType
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupJoinType.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupJoinType;
        })();

        /**
         * FriendType enum.
         * @name dtalk.proto.FriendType
         * @enum {number}
         * @property {number} FriendAllow=0 FriendAllow value
         * @property {number} FriendDeny=1 FriendDeny value
         */
        proto.FriendType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "FriendAllow"] = 0;
            values[valuesById[1] = "FriendDeny"] = 1;
            return values;
        })();

        proto.ActionUpdateGroupFriendType = (function() {

            /**
             * Properties of an ActionUpdateGroupFriendType.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupFriendType
             * @property {number|Long|null} [group] ActionUpdateGroupFriendType group
             * @property {dtalk.proto.FriendType|null} [type] ActionUpdateGroupFriendType type
             * @property {number|Long|null} [time] ActionUpdateGroupFriendType time
             */

            /**
             * Constructs a new ActionUpdateGroupFriendType.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupFriendType.
             * @implements IActionUpdateGroupFriendType
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupFriendType=} [properties] Properties to set
             */
            function ActionUpdateGroupFriendType(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupFriendType group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @instance
             */
            ActionUpdateGroupFriendType.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupFriendType type.
             * @member {dtalk.proto.FriendType} type
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @instance
             */
            ActionUpdateGroupFriendType.prototype.type = 0;

            /**
             * ActionUpdateGroupFriendType time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @instance
             */
            ActionUpdateGroupFriendType.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupFriendType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupFriendType.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @static
             * @param {dtalk.proto.IActionUpdateGroupFriendType} message ActionUpdateGroupFriendType message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupFriendType.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupFriendType message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupFriendType} ActionUpdateGroupFriendType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupFriendType.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupFriendType();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupFriendType message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupFriendType} ActionUpdateGroupFriendType
             */
            ActionUpdateGroupFriendType.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupFriendType)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupFriendType();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                switch (object.type) {
                case "FriendAllow":
                case 0:
                    message.type = 0;
                    break;
                case "FriendDeny":
                case 1:
                    message.type = 1;
                    break;
                }
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupFriendType message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @static
             * @param {dtalk.proto.ActionUpdateGroupFriendType} message ActionUpdateGroupFriendType
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupFriendType.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.type = options.enums === String ? "FriendAllow" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.FriendType[message.type] : message.type;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupFriendType to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupFriendType
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupFriendType.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupFriendType;
        })();

        /**
         * MuteType enum.
         * @name dtalk.proto.MuteType
         * @enum {number}
         * @property {number} MuteAllow=0 MuteAllow value
         * @property {number} MuteDeny=1 MuteDeny value
         */
        proto.MuteType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MuteAllow"] = 0;
            values[valuesById[1] = "MuteDeny"] = 1;
            return values;
        })();

        proto.ActionUpdateGroupMuteType = (function() {

            /**
             * Properties of an ActionUpdateGroupMuteType.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupMuteType
             * @property {number|Long|null} [group] ActionUpdateGroupMuteType group
             * @property {dtalk.proto.MuteType|null} [type] ActionUpdateGroupMuteType type
             * @property {number|Long|null} [time] ActionUpdateGroupMuteType time
             */

            /**
             * Constructs a new ActionUpdateGroupMuteType.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupMuteType.
             * @implements IActionUpdateGroupMuteType
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupMuteType=} [properties] Properties to set
             */
            function ActionUpdateGroupMuteType(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupMuteType group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @instance
             */
            ActionUpdateGroupMuteType.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupMuteType type.
             * @member {dtalk.proto.MuteType} type
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @instance
             */
            ActionUpdateGroupMuteType.prototype.type = 0;

            /**
             * ActionUpdateGroupMuteType time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @instance
             */
            ActionUpdateGroupMuteType.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupMuteType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupMuteType.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @static
             * @param {dtalk.proto.IActionUpdateGroupMuteType} message ActionUpdateGroupMuteType message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupMuteType.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupMuteType message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupMuteType} ActionUpdateGroupMuteType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupMuteType.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupMuteType();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupMuteType message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupMuteType} ActionUpdateGroupMuteType
             */
            ActionUpdateGroupMuteType.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupMuteType)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupMuteType();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                switch (object.type) {
                case "MuteAllow":
                case 0:
                    message.type = 0;
                    break;
                case "MuteDeny":
                case 1:
                    message.type = 1;
                    break;
                }
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupMuteType message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @static
             * @param {dtalk.proto.ActionUpdateGroupMuteType} message ActionUpdateGroupMuteType
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupMuteType.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.type = options.enums === String ? "MuteAllow" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.MuteType[message.type] : message.type;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupMuteType to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupMuteType
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupMuteType.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupMuteType;
        })();

        /**
         * MemberType enum.
         * @name dtalk.proto.MemberType
         * @enum {number}
         * @property {number} Normal=0 Normal value
         * @property {number} Admin=1 Admin value
         * @property {number} Owner=2 Owner value
         */
        proto.MemberType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Normal"] = 0;
            values[valuesById[1] = "Admin"] = 1;
            values[valuesById[2] = "Owner"] = 2;
            return values;
        })();

        proto.ActionUpdateGroupMemberType = (function() {

            /**
             * Properties of an ActionUpdateGroupMemberType.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupMemberType
             * @property {number|Long|null} [group] ActionUpdateGroupMemberType group
             * @property {string|null} [uid] ActionUpdateGroupMemberType uid
             * @property {dtalk.proto.MemberType|null} [type] ActionUpdateGroupMemberType type
             * @property {number|Long|null} [time] ActionUpdateGroupMemberType time
             */

            /**
             * Constructs a new ActionUpdateGroupMemberType.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupMemberType.
             * @implements IActionUpdateGroupMemberType
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupMemberType=} [properties] Properties to set
             */
            function ActionUpdateGroupMemberType(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupMemberType group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @instance
             */
            ActionUpdateGroupMemberType.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupMemberType uid.
             * @member {string} uid
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @instance
             */
            ActionUpdateGroupMemberType.prototype.uid = "";

            /**
             * ActionUpdateGroupMemberType type.
             * @member {dtalk.proto.MemberType} type
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @instance
             */
            ActionUpdateGroupMemberType.prototype.type = 0;

            /**
             * ActionUpdateGroupMemberType time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @instance
             */
            ActionUpdateGroupMemberType.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupMemberType message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupMemberType.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @static
             * @param {dtalk.proto.IActionUpdateGroupMemberType} message ActionUpdateGroupMemberType message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupMemberType.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.uid);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupMemberType message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupMemberType} ActionUpdateGroupMemberType
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupMemberType.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupMemberType();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.uid = reader.string();
                        break;
                    case 3:
                        message.type = reader.int32();
                        break;
                    case 4:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupMemberType message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupMemberType} ActionUpdateGroupMemberType
             */
            ActionUpdateGroupMemberType.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupMemberType)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupMemberType();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.uid != null)
                    message.uid = String(object.uid);
                switch (object.type) {
                case "Normal":
                case 0:
                    message.type = 0;
                    break;
                case "Admin":
                case 1:
                    message.type = 1;
                    break;
                case "Owner":
                case 2:
                    message.type = 2;
                    break;
                }
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupMemberType message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @static
             * @param {dtalk.proto.ActionUpdateGroupMemberType} message ActionUpdateGroupMemberType
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupMemberType.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.uid = "";
                    object.type = options.enums === String ? "Normal" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dtalk.proto.MemberType[message.type] : message.type;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupMemberType to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupMemberType
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupMemberType.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupMemberType;
        })();

        proto.ActionUpdateGroupMemberMuteTime = (function() {

            /**
             * Properties of an ActionUpdateGroupMemberMuteTime.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupMemberMuteTime
             * @property {number|Long|null} [group] ActionUpdateGroupMemberMuteTime group
             * @property {Array.<string>|null} [uid] ActionUpdateGroupMemberMuteTime uid
             * @property {number|Long|null} [muteTime] ActionUpdateGroupMemberMuteTime muteTime
             * @property {number|Long|null} [time] ActionUpdateGroupMemberMuteTime time
             */

            /**
             * Constructs a new ActionUpdateGroupMemberMuteTime.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupMemberMuteTime.
             * @implements IActionUpdateGroupMemberMuteTime
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupMemberMuteTime=} [properties] Properties to set
             */
            function ActionUpdateGroupMemberMuteTime(properties) {
                this.uid = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupMemberMuteTime group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @instance
             */
            ActionUpdateGroupMemberMuteTime.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupMemberMuteTime uid.
             * @member {Array.<string>} uid
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @instance
             */
            ActionUpdateGroupMemberMuteTime.prototype.uid = $util.emptyArray;

            /**
             * ActionUpdateGroupMemberMuteTime muteTime.
             * @member {number|Long} muteTime
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @instance
             */
            ActionUpdateGroupMemberMuteTime.prototype.muteTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupMemberMuteTime time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @instance
             */
            ActionUpdateGroupMemberMuteTime.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupMemberMuteTime message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupMemberMuteTime.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @static
             * @param {dtalk.proto.IActionUpdateGroupMemberMuteTime} message ActionUpdateGroupMemberMuteTime message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupMemberMuteTime.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.uid != null && message.uid.length)
                    for (let i = 0; i < message.uid.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.uid[i]);
                if (message.muteTime != null && Object.hasOwnProperty.call(message, "muteTime"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.muteTime);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupMemberMuteTime message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupMemberMuteTime} ActionUpdateGroupMemberMuteTime
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupMemberMuteTime.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupMemberMuteTime();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        if (!(message.uid && message.uid.length))
                            message.uid = [];
                        message.uid.push(reader.string());
                        break;
                    case 3:
                        message.muteTime = reader.int64();
                        break;
                    case 4:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupMemberMuteTime message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupMemberMuteTime} ActionUpdateGroupMemberMuteTime
             */
            ActionUpdateGroupMemberMuteTime.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupMemberMuteTime)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupMemberMuteTime();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.uid) {
                    if (!Array.isArray(object.uid))
                        throw TypeError(".dtalk.proto.ActionUpdateGroupMemberMuteTime.uid: array expected");
                    message.uid = [];
                    for (let i = 0; i < object.uid.length; ++i)
                        message.uid[i] = String(object.uid[i]);
                }
                if (object.muteTime != null)
                    if ($util.Long)
                        (message.muteTime = $util.Long.fromValue(object.muteTime)).unsigned = false;
                    else if (typeof object.muteTime === "string")
                        message.muteTime = parseInt(object.muteTime, 10);
                    else if (typeof object.muteTime === "number")
                        message.muteTime = object.muteTime;
                    else if (typeof object.muteTime === "object")
                        message.muteTime = new $util.LongBits(object.muteTime.low >>> 0, object.muteTime.high >>> 0).toNumber();
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupMemberMuteTime message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @static
             * @param {dtalk.proto.ActionUpdateGroupMemberMuteTime} message ActionUpdateGroupMemberMuteTime
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupMemberMuteTime.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uid = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.muteTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.muteTime = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.uid && message.uid.length) {
                    object.uid = [];
                    for (let j = 0; j < message.uid.length; ++j)
                        object.uid[j] = message.uid[j];
                }
                if (message.muteTime != null && message.hasOwnProperty("muteTime"))
                    if (typeof message.muteTime === "number")
                        object.muteTime = options.longs === String ? String(message.muteTime) : message.muteTime;
                    else
                        object.muteTime = options.longs === String ? $util.Long.prototype.toString.call(message.muteTime) : options.longs === Number ? new $util.LongBits(message.muteTime.low >>> 0, message.muteTime.high >>> 0).toNumber() : message.muteTime;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupMemberMuteTime to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupMemberMuteTime
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupMemberMuteTime.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupMemberMuteTime;
        })();

        proto.ActionUpdateGroupName = (function() {

            /**
             * Properties of an ActionUpdateGroupName.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupName
             * @property {number|Long|null} [group] ActionUpdateGroupName group
             * @property {string|null} [name] ActionUpdateGroupName name
             * @property {number|Long|null} [time] ActionUpdateGroupName time
             */

            /**
             * Constructs a new ActionUpdateGroupName.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupName.
             * @implements IActionUpdateGroupName
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupName=} [properties] Properties to set
             */
            function ActionUpdateGroupName(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupName group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @instance
             */
            ActionUpdateGroupName.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupName name.
             * @member {string} name
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @instance
             */
            ActionUpdateGroupName.prototype.name = "";

            /**
             * ActionUpdateGroupName time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @instance
             */
            ActionUpdateGroupName.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupName message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupName.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @static
             * @param {dtalk.proto.IActionUpdateGroupName} message ActionUpdateGroupName message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupName.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupName message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupName} ActionUpdateGroupName
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupName.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupName();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupName message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupName} ActionUpdateGroupName
             */
            ActionUpdateGroupName.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupName)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupName();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupName message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @static
             * @param {dtalk.proto.ActionUpdateGroupName} message ActionUpdateGroupName
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupName.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.name = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupName to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupName
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupName.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupName;
        })();

        proto.ActionUpdateGroupAvatar = (function() {

            /**
             * Properties of an ActionUpdateGroupAvatar.
             * @memberof dtalk.proto
             * @interface IActionUpdateGroupAvatar
             * @property {number|Long|null} [group] ActionUpdateGroupAvatar group
             * @property {string|null} [avatar] ActionUpdateGroupAvatar avatar
             * @property {number|Long|null} [time] ActionUpdateGroupAvatar time
             */

            /**
             * Constructs a new ActionUpdateGroupAvatar.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionUpdateGroupAvatar.
             * @implements IActionUpdateGroupAvatar
             * @constructor
             * @param {dtalk.proto.IActionUpdateGroupAvatar=} [properties] Properties to set
             */
            function ActionUpdateGroupAvatar(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionUpdateGroupAvatar group.
             * @member {number|Long} group
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @instance
             */
            ActionUpdateGroupAvatar.prototype.group = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionUpdateGroupAvatar avatar.
             * @member {string} avatar
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @instance
             */
            ActionUpdateGroupAvatar.prototype.avatar = "";

            /**
             * ActionUpdateGroupAvatar time.
             * @member {number|Long} time
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @instance
             */
            ActionUpdateGroupAvatar.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Encodes the specified ActionUpdateGroupAvatar message. Does not implicitly {@link dtalk.proto.ActionUpdateGroupAvatar.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @static
             * @param {dtalk.proto.IActionUpdateGroupAvatar} message ActionUpdateGroupAvatar message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionUpdateGroupAvatar.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.group);
                if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.avatar);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
                return writer;
            };

            /**
             * Decodes an ActionUpdateGroupAvatar message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionUpdateGroupAvatar} ActionUpdateGroupAvatar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionUpdateGroupAvatar.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionUpdateGroupAvatar();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.group = reader.int64();
                        break;
                    case 2:
                        message.avatar = reader.string();
                        break;
                    case 3:
                        message.time = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionUpdateGroupAvatar message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionUpdateGroupAvatar} ActionUpdateGroupAvatar
             */
            ActionUpdateGroupAvatar.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionUpdateGroupAvatar)
                    return object;
                let message = new $root.dtalk.proto.ActionUpdateGroupAvatar();
                if (object.group != null)
                    if ($util.Long)
                        (message.group = $util.Long.fromValue(object.group)).unsigned = false;
                    else if (typeof object.group === "string")
                        message.group = parseInt(object.group, 10);
                    else if (typeof object.group === "number")
                        message.group = object.group;
                    else if (typeof object.group === "object")
                        message.group = new $util.LongBits(object.group.low >>> 0, object.group.high >>> 0).toNumber();
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from an ActionUpdateGroupAvatar message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @static
             * @param {dtalk.proto.ActionUpdateGroupAvatar} message ActionUpdateGroupAvatar
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionUpdateGroupAvatar.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.group = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.group = options.longs === String ? "0" : 0;
                    object.avatar = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.group != null && message.hasOwnProperty("group"))
                    if (typeof message.group === "number")
                        object.group = options.longs === String ? String(message.group) : message.group;
                    else
                        object.group = options.longs === String ? $util.Long.prototype.toString.call(message.group) : options.longs === Number ? new $util.LongBits(message.group.low >>> 0, message.group.high >>> 0).toNumber() : message.group;
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
                return object;
            };

            /**
             * Converts this ActionUpdateGroupAvatar to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionUpdateGroupAvatar
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionUpdateGroupAvatar.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionUpdateGroupAvatar;
        })();

        proto.ActionStartCall = (function() {

            /**
             * Properties of an ActionStartCall.
             * @memberof dtalk.proto
             * @interface IActionStartCall
             * @property {number|Long|null} [traceId] ActionStartCall traceId
             */

            /**
             * Constructs a new ActionStartCall.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionStartCall.
             * @implements IActionStartCall
             * @constructor
             * @param {dtalk.proto.IActionStartCall=} [properties] Properties to set
             */
            function ActionStartCall(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionStartCall traceId.
             * @member {number|Long} traceId
             * @memberof dtalk.proto.ActionStartCall
             * @instance
             */
            ActionStartCall.prototype.traceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Encodes the specified ActionStartCall message. Does not implicitly {@link dtalk.proto.ActionStartCall.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionStartCall
             * @static
             * @param {dtalk.proto.IActionStartCall} message ActionStartCall message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionStartCall.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.traceId);
                return writer;
            };

            /**
             * Decodes an ActionStartCall message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionStartCall
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionStartCall} ActionStartCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionStartCall.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionStartCall();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.traceId = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionStartCall message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionStartCall
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionStartCall} ActionStartCall
             */
            ActionStartCall.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionStartCall)
                    return object;
                let message = new $root.dtalk.proto.ActionStartCall();
                if (object.traceId != null)
                    if ($util.Long)
                        (message.traceId = $util.Long.fromValue(object.traceId)).unsigned = false;
                    else if (typeof object.traceId === "string")
                        message.traceId = parseInt(object.traceId, 10);
                    else if (typeof object.traceId === "number")
                        message.traceId = object.traceId;
                    else if (typeof object.traceId === "object")
                        message.traceId = new $util.LongBits(object.traceId.low >>> 0, object.traceId.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an ActionStartCall message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionStartCall
             * @static
             * @param {dtalk.proto.ActionStartCall} message ActionStartCall
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionStartCall.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.traceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.traceId = options.longs === String ? "0" : 0;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                    if (typeof message.traceId === "number")
                        object.traceId = options.longs === String ? String(message.traceId) : message.traceId;
                    else
                        object.traceId = options.longs === String ? $util.Long.prototype.toString.call(message.traceId) : options.longs === Number ? new $util.LongBits(message.traceId.low >>> 0, message.traceId.high >>> 0).toNumber() : message.traceId;
                return object;
            };

            /**
             * Converts this ActionStartCall to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionStartCall
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionStartCall.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionStartCall;
        })();

        proto.ActionAcceptCall = (function() {

            /**
             * Properties of an ActionAcceptCall.
             * @memberof dtalk.proto
             * @interface IActionAcceptCall
             * @property {number|Long|null} [traceId] ActionAcceptCall traceId
             * @property {number|null} [roomId] ActionAcceptCall roomId
             * @property {string|null} [uid] ActionAcceptCall uid
             * @property {string|null} [userSig] ActionAcceptCall userSig
             * @property {string|null} [privateMapKey] ActionAcceptCall privateMapKey
             * @property {number|null} [skdAppId] ActionAcceptCall skdAppId
             */

            /**
             * Constructs a new ActionAcceptCall.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionAcceptCall.
             * @implements IActionAcceptCall
             * @constructor
             * @param {dtalk.proto.IActionAcceptCall=} [properties] Properties to set
             */
            function ActionAcceptCall(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionAcceptCall traceId.
             * @member {number|Long} traceId
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             */
            ActionAcceptCall.prototype.traceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionAcceptCall roomId.
             * @member {number} roomId
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             */
            ActionAcceptCall.prototype.roomId = 0;

            /**
             * ActionAcceptCall uid.
             * @member {string} uid
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             */
            ActionAcceptCall.prototype.uid = "";

            /**
             * ActionAcceptCall userSig.
             * @member {string} userSig
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             */
            ActionAcceptCall.prototype.userSig = "";

            /**
             * ActionAcceptCall privateMapKey.
             * @member {string} privateMapKey
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             */
            ActionAcceptCall.prototype.privateMapKey = "";

            /**
             * ActionAcceptCall skdAppId.
             * @member {number} skdAppId
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             */
            ActionAcceptCall.prototype.skdAppId = 0;

            /**
             * Encodes the specified ActionAcceptCall message. Does not implicitly {@link dtalk.proto.ActionAcceptCall.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionAcceptCall
             * @static
             * @param {dtalk.proto.IActionAcceptCall} message ActionAcceptCall message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionAcceptCall.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.traceId);
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
                if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.uid);
                if (message.userSig != null && Object.hasOwnProperty.call(message, "userSig"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.userSig);
                if (message.privateMapKey != null && Object.hasOwnProperty.call(message, "privateMapKey"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.privateMapKey);
                if (message.skdAppId != null && Object.hasOwnProperty.call(message, "skdAppId"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.skdAppId);
                return writer;
            };

            /**
             * Decodes an ActionAcceptCall message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionAcceptCall
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionAcceptCall} ActionAcceptCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionAcceptCall.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionAcceptCall();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.traceId = reader.int64();
                        break;
                    case 2:
                        message.roomId = reader.int32();
                        break;
                    case 3:
                        message.uid = reader.string();
                        break;
                    case 4:
                        message.userSig = reader.string();
                        break;
                    case 5:
                        message.privateMapKey = reader.string();
                        break;
                    case 6:
                        message.skdAppId = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionAcceptCall message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionAcceptCall
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionAcceptCall} ActionAcceptCall
             */
            ActionAcceptCall.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionAcceptCall)
                    return object;
                let message = new $root.dtalk.proto.ActionAcceptCall();
                if (object.traceId != null)
                    if ($util.Long)
                        (message.traceId = $util.Long.fromValue(object.traceId)).unsigned = false;
                    else if (typeof object.traceId === "string")
                        message.traceId = parseInt(object.traceId, 10);
                    else if (typeof object.traceId === "number")
                        message.traceId = object.traceId;
                    else if (typeof object.traceId === "object")
                        message.traceId = new $util.LongBits(object.traceId.low >>> 0, object.traceId.high >>> 0).toNumber();
                if (object.roomId != null)
                    message.roomId = object.roomId | 0;
                if (object.uid != null)
                    message.uid = String(object.uid);
                if (object.userSig != null)
                    message.userSig = String(object.userSig);
                if (object.privateMapKey != null)
                    message.privateMapKey = String(object.privateMapKey);
                if (object.skdAppId != null)
                    message.skdAppId = object.skdAppId | 0;
                return message;
            };

            /**
             * Creates a plain object from an ActionAcceptCall message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionAcceptCall
             * @static
             * @param {dtalk.proto.ActionAcceptCall} message ActionAcceptCall
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionAcceptCall.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.traceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.traceId = options.longs === String ? "0" : 0;
                    object.roomId = 0;
                    object.uid = "";
                    object.userSig = "";
                    object.privateMapKey = "";
                    object.skdAppId = 0;
                }
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                    if (typeof message.traceId === "number")
                        object.traceId = options.longs === String ? String(message.traceId) : message.traceId;
                    else
                        object.traceId = options.longs === String ? $util.Long.prototype.toString.call(message.traceId) : options.longs === Number ? new $util.LongBits(message.traceId.low >>> 0, message.traceId.high >>> 0).toNumber() : message.traceId;
                if (message.roomId != null && message.hasOwnProperty("roomId"))
                    object.roomId = message.roomId;
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.userSig != null && message.hasOwnProperty("userSig"))
                    object.userSig = message.userSig;
                if (message.privateMapKey != null && message.hasOwnProperty("privateMapKey"))
                    object.privateMapKey = message.privateMapKey;
                if (message.skdAppId != null && message.hasOwnProperty("skdAppId"))
                    object.skdAppId = message.skdAppId;
                return object;
            };

            /**
             * Converts this ActionAcceptCall to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionAcceptCall
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionAcceptCall.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionAcceptCall;
        })();

        /**
         * StopCallType enum.
         * @name dtalk.proto.StopCallType
         * @enum {number}
         * @property {number} Busy=0 Busy value
         * @property {number} Timeout=1 Timeout value
         * @property {number} Reject=2 Reject value
         * @property {number} Hangup=3 Hangup value
         * @property {number} Cancel=4 Cancel value
         */
        proto.StopCallType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Busy"] = 0;
            values[valuesById[1] = "Timeout"] = 1;
            values[valuesById[2] = "Reject"] = 2;
            values[valuesById[3] = "Hangup"] = 3;
            values[valuesById[4] = "Cancel"] = 4;
            return values;
        })();

        proto.ActionStopCall = (function() {

            /**
             * Properties of an ActionStopCall.
             * @memberof dtalk.proto
             * @interface IActionStopCall
             * @property {number|Long|null} [traceId] ActionStopCall traceId
             * @property {dtalk.proto.StopCallType|null} [reason] ActionStopCall reason
             */

            /**
             * Constructs a new ActionStopCall.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionStopCall.
             * @implements IActionStopCall
             * @constructor
             * @param {dtalk.proto.IActionStopCall=} [properties] Properties to set
             */
            function ActionStopCall(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionStopCall traceId.
             * @member {number|Long} traceId
             * @memberof dtalk.proto.ActionStopCall
             * @instance
             */
            ActionStopCall.prototype.traceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionStopCall reason.
             * @member {dtalk.proto.StopCallType} reason
             * @memberof dtalk.proto.ActionStopCall
             * @instance
             */
            ActionStopCall.prototype.reason = 0;

            /**
             * Encodes the specified ActionStopCall message. Does not implicitly {@link dtalk.proto.ActionStopCall.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionStopCall
             * @static
             * @param {dtalk.proto.IActionStopCall} message ActionStopCall message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionStopCall.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.traceId);
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reason);
                return writer;
            };

            /**
             * Decodes an ActionStopCall message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionStopCall
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionStopCall} ActionStopCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionStopCall.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionStopCall();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.traceId = reader.int64();
                        break;
                    case 2:
                        message.reason = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionStopCall message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionStopCall
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionStopCall} ActionStopCall
             */
            ActionStopCall.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionStopCall)
                    return object;
                let message = new $root.dtalk.proto.ActionStopCall();
                if (object.traceId != null)
                    if ($util.Long)
                        (message.traceId = $util.Long.fromValue(object.traceId)).unsigned = false;
                    else if (typeof object.traceId === "string")
                        message.traceId = parseInt(object.traceId, 10);
                    else if (typeof object.traceId === "number")
                        message.traceId = object.traceId;
                    else if (typeof object.traceId === "object")
                        message.traceId = new $util.LongBits(object.traceId.low >>> 0, object.traceId.high >>> 0).toNumber();
                switch (object.reason) {
                case "Busy":
                case 0:
                    message.reason = 0;
                    break;
                case "Timeout":
                case 1:
                    message.reason = 1;
                    break;
                case "Reject":
                case 2:
                    message.reason = 2;
                    break;
                case "Hangup":
                case 3:
                    message.reason = 3;
                    break;
                case "Cancel":
                case 4:
                    message.reason = 4;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from an ActionStopCall message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionStopCall
             * @static
             * @param {dtalk.proto.ActionStopCall} message ActionStopCall
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionStopCall.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.traceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.traceId = options.longs === String ? "0" : 0;
                    object.reason = options.enums === String ? "Busy" : 0;
                }
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                    if (typeof message.traceId === "number")
                        object.traceId = options.longs === String ? String(message.traceId) : message.traceId;
                    else
                        object.traceId = options.longs === String ? $util.Long.prototype.toString.call(message.traceId) : options.longs === Number ? new $util.LongBits(message.traceId.low >>> 0, message.traceId.high >>> 0).toNumber() : message.traceId;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = options.enums === String ? $root.dtalk.proto.StopCallType[message.reason] : message.reason;
                return object;
            };

            /**
             * Converts this ActionStopCall to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionStopCall
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionStopCall.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionStopCall;
        })();

        proto.ActionRevoke = (function() {

            /**
             * Properties of an ActionRevoke.
             * @memberof dtalk.proto
             * @interface IActionRevoke
             * @property {number|Long|null} [logId] ActionRevoke logId
             * @property {string|null} [operator] ActionRevoke operator
             * @property {boolean|null} [self] ActionRevoke self
             */

            /**
             * Constructs a new ActionRevoke.
             * @memberof dtalk.proto
             * @classdesc Represents an ActionRevoke.
             * @implements IActionRevoke
             * @constructor
             * @param {dtalk.proto.IActionRevoke=} [properties] Properties to set
             */
            function ActionRevoke(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionRevoke logId.
             * @member {number|Long} logId
             * @memberof dtalk.proto.ActionRevoke
             * @instance
             */
            ActionRevoke.prototype.logId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ActionRevoke operator.
             * @member {string} operator
             * @memberof dtalk.proto.ActionRevoke
             * @instance
             */
            ActionRevoke.prototype.operator = "";

            /**
             * ActionRevoke self.
             * @member {boolean} self
             * @memberof dtalk.proto.ActionRevoke
             * @instance
             */
            ActionRevoke.prototype.self = false;

            /**
             * Encodes the specified ActionRevoke message. Does not implicitly {@link dtalk.proto.ActionRevoke.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ActionRevoke
             * @static
             * @param {dtalk.proto.IActionRevoke} message ActionRevoke message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionRevoke.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.logId != null && Object.hasOwnProperty.call(message, "logId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.logId);
                if (message.operator != null && Object.hasOwnProperty.call(message, "operator"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.operator);
                if (message.self != null && Object.hasOwnProperty.call(message, "self"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.self);
                return writer;
            };

            /**
             * Decodes an ActionRevoke message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ActionRevoke
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ActionRevoke} ActionRevoke
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionRevoke.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ActionRevoke();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.logId = reader.int64();
                        break;
                    case 2:
                        message.operator = reader.string();
                        break;
                    case 3:
                        message.self = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an ActionRevoke message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ActionRevoke
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ActionRevoke} ActionRevoke
             */
            ActionRevoke.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ActionRevoke)
                    return object;
                let message = new $root.dtalk.proto.ActionRevoke();
                if (object.logId != null)
                    if ($util.Long)
                        (message.logId = $util.Long.fromValue(object.logId)).unsigned = false;
                    else if (typeof object.logId === "string")
                        message.logId = parseInt(object.logId, 10);
                    else if (typeof object.logId === "number")
                        message.logId = object.logId;
                    else if (typeof object.logId === "object")
                        message.logId = new $util.LongBits(object.logId.low >>> 0, object.logId.high >>> 0).toNumber();
                if (object.operator != null)
                    message.operator = String(object.operator);
                if (object.self != null)
                    message.self = Boolean(object.self);
                return message;
            };

            /**
             * Creates a plain object from an ActionRevoke message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ActionRevoke
             * @static
             * @param {dtalk.proto.ActionRevoke} message ActionRevoke
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionRevoke.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.logId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.logId = options.longs === String ? "0" : 0;
                    object.operator = "";
                    object.self = false;
                }
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (typeof message.logId === "number")
                        object.logId = options.longs === String ? String(message.logId) : message.logId;
                    else
                        object.logId = options.longs === String ? $util.Long.prototype.toString.call(message.logId) : options.longs === Number ? new $util.LongBits(message.logId.low >>> 0, message.logId.high >>> 0).toNumber() : message.logId;
                if (message.operator != null && message.hasOwnProperty("operator"))
                    object.operator = message.operator;
                if (message.self != null && message.hasOwnProperty("self"))
                    object.self = message.self;
                return object;
            };

            /**
             * Converts this ActionRevoke to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ActionRevoke
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionRevoke.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionRevoke;
        })();

        return proto;
    })();

    return dtalk;
})();

export { $root as default };
