import { UserProfile } from './user-profile'
import { GroupChat, Message, SingleChat } from './user-chat'
import { ChatGroup } from './user-chat-group'

export type tResultOfFriendSearch = Pick<UserProfile, 'nickname' | 'remark' | 'address' | 'avatar'> & {
    matchedKeyName: 'nickname' | 'remark' | 'address'
    matchedStr: string
}

type tExtraTypeOfResultOfChatHistorySearch = {
    matchedMessages: Message[]
    matchedStr: string
}

type tResultOfSingleChatHistorySearch = Pick<SingleChat, 'type' | 'id'> & tExtraTypeOfResultOfChatHistorySearch

type tResultOfGroupChatHistorySearch = Pick<GroupChat, 'type' | 'id'> & tExtraTypeOfResultOfChatHistorySearch

export type tResultOfChatHistorySearch = tResultOfSingleChatHistorySearch | tResultOfGroupChatHistorySearch

export type tResultOfChatGroupsSearch = ChatGroup & { matchedStr: string }
