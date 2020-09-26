import L from '../common/logger';
import * as line from '@line/bot-sdk';
import {
  MsgTask,
  MsgTypeText,
  MsgTypeImage,
  MsgTypeVideo,
  MsgTypeAudio,
  MsgTypeFile,
  MsgTypeLocation,
  MsgTypeSticker,
} from './interface';

export class LineEvRoutingHelper {
  public async hears(event: line.WebhookEvent): Promise<void> {
    if (event.type === 'message') {
      return this.msgEvHandler(event);
    }
  }

  private msgTasks: MsgTask[] = [];

  public msgEv(msgTask: MsgTask): void {
    this.msgTasks.push(msgTask);
  }

  private async msgEvHandler(event): Promise<void> {
    L.info(event);

    let msgTaskI;

    for (msgTaskI in this.msgTasks) {
      const msgTask = this.msgTasks[msgTaskI];

      if ('source' in msgTask) {
        if ('type' in msgTask.source && event.source.type !== msgTask.source.type) {
          continue;
        }
        if ('userId' in msgTask.source && event.source.userId !== msgTask.source.userId) {
          continue;
        }
        if ('groupId' in msgTask.source && event.source['groupId'] !== msgTask.source.groupId) {
          continue;
        }
        if ('roomId' in msgTask.source && event.source['roomId'] !== msgTask.source.roomId) {
          continue;
        }
      }
      if (!('type' in msgTask)) {
        msgTask.task(event);
        continue;
      }
      if (msgTask.type instanceof MsgTypeText && event.message.type === 'text') {
        if ('text' in msgTask.type && !event.message.text.trim().match(msgTask.type.text)) {
          continue;
        }
        msgTask.task(event);
        break;
      }
      if (msgTask.type instanceof MsgTypeImage && event.message.type === 'image') {
        // TODO: Coming soon...
        continue;
      }
      if (msgTask.type instanceof MsgTypeVideo && event.message.type === 'video') {
        // TODO: Coming soon...
        continue;
      }
      if (msgTask.type instanceof MsgTypeAudio && event.message.type === 'audio') {
        // TODO: Coming soon...
        continue;
      }
      if (msgTask.type instanceof MsgTypeFile && event.message.type === 'file') {
        // TODO: Coming soon...
        continue;
      }
      if (msgTask.type instanceof MsgTypeLocation && event.message.type === 'location') {
        // TODO: Coming soon...
        continue;
      }
      if (msgTask.type instanceof MsgTypeSticker && event.message.type === 'sticker') {
        // TODO: Coming soon...
        continue;
      }
    }

    if (parseInt(msgTaskI) === this.msgTasks.length - 1) {
      // TODO: Coming soon...
      return;
    }

    return;
  }

  // public followEve(task: Task) {}

  // public unFollowEve(task: Task) {}

  // public joinEve(task: Task) {}

  // public leaveEve(task: Task) {}

  // public memberJoinEve(task: Task) {}

  // public memberLeaveEve(task: Task) {}

  // public postBackEve(task: Task) {}

  // public accountLinkEve(task: Task) {}
}
