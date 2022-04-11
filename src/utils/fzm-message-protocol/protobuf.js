/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const chat33 = $root.chat33 = (() => {

    /**
     * Namespace chat33.
     * @exports chat33
     * @namespace
     */
    const chat33 = {};

    chat33.comet = (function() {

        /**
         * Namespace comet.
         * @memberof chat33
         * @namespace
         */
        const comet = {};

        comet.AuthMsg = (function() {

            /**
             * Properties of an AuthMsg.
             * @memberof chat33.comet
             * @interface IAuthMsg
             * @property {string|null} [appId] AuthMsg appId
             * @property {string|null} [token] AuthMsg token
             * @property {Uint8Array|null} [ext] AuthMsg ext
             */

            /**
             * Constructs a new AuthMsg.
             * @memberof chat33.comet
             * @classdesc Represents an AuthMsg.
             * @implements IAuthMsg
             * @constructor
             * @param {chat33.comet.IAuthMsg=} [properties] Properties to set
             */
            function AuthMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AuthMsg appId.
             * @member {string} appId
             * @memberof chat33.comet.AuthMsg
             * @instance
             */
            AuthMsg.prototype.appId = "";

            /**
             * AuthMsg token.
             * @member {string} token
             * @memberof chat33.comet.AuthMsg
             * @instance
             */
            AuthMsg.prototype.token = "";

            /**
             * AuthMsg ext.
             * @member {Uint8Array} ext
             * @memberof chat33.comet.AuthMsg
             * @instance
             */
            AuthMsg.prototype.ext = $util.newBuffer([]);

            /**
             * Creates a new AuthMsg instance using the specified properties.
             * @function create
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {chat33.comet.IAuthMsg=} [properties] Properties to set
             * @returns {chat33.comet.AuthMsg} AuthMsg instance
             */
            AuthMsg.create = function create(properties) {
                return new AuthMsg(properties);
            };

            /**
             * Encodes the specified AuthMsg message. Does not implicitly {@link chat33.comet.AuthMsg.verify|verify} messages.
             * @function encode
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {chat33.comet.IAuthMsg} message AuthMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.appId != null && Object.hasOwnProperty.call(message, "appId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.appId);
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
                if (message.ext != null && Object.hasOwnProperty.call(message, "ext"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.ext);
                return writer;
            };

            /**
             * Encodes the specified AuthMsg message, length delimited. Does not implicitly {@link chat33.comet.AuthMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {chat33.comet.IAuthMsg} message AuthMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AuthMsg message from the specified reader or buffer.
             * @function decode
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {chat33.comet.AuthMsg} AuthMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat33.comet.AuthMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.appId = reader.string();
                        break;
                    case 2:
                        message.token = reader.string();
                        break;
                    case 3:
                        message.ext = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AuthMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {chat33.comet.AuthMsg} AuthMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AuthMsg message.
             * @function verify
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.appId != null && message.hasOwnProperty("appId"))
                    if (!$util.isString(message.appId))
                        return "appId: string expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                if (message.ext != null && message.hasOwnProperty("ext"))
                    if (!(message.ext && typeof message.ext.length === "number" || $util.isString(message.ext)))
                        return "ext: buffer expected";
                return null;
            };

            /**
             * Creates an AuthMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {chat33.comet.AuthMsg} AuthMsg
             */
            AuthMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.chat33.comet.AuthMsg)
                    return object;
                let message = new $root.chat33.comet.AuthMsg();
                if (object.appId != null)
                    message.appId = String(object.appId);
                if (object.token != null)
                    message.token = String(object.token);
                if (object.ext != null)
                    if (typeof object.ext === "string")
                        $util.base64.decode(object.ext, message.ext = $util.newBuffer($util.base64.length(object.ext)), 0);
                    else if (object.ext.length)
                        message.ext = object.ext;
                return message;
            };

            /**
             * Creates a plain object from an AuthMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof chat33.comet.AuthMsg
             * @static
             * @param {chat33.comet.AuthMsg} message AuthMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.appId = "";
                    object.token = "";
                    if (options.bytes === String)
                        object.ext = "";
                    else {
                        object.ext = [];
                        if (options.bytes !== Array)
                            object.ext = $util.newBuffer(object.ext);
                    }
                }
                if (message.appId != null && message.hasOwnProperty("appId"))
                    object.appId = message.appId;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.ext != null && message.hasOwnProperty("ext"))
                    object.ext = options.bytes === String ? $util.base64.encode(message.ext, 0, message.ext.length) : options.bytes === Array ? Array.prototype.slice.call(message.ext) : message.ext;
                return object;
            };

            /**
             * Converts this AuthMsg to JSON.
             * @function toJSON
             * @memberof chat33.comet.AuthMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AuthMsg;
        })();

        return comet;
    })();

    return chat33;
})();

export { $root as default };
