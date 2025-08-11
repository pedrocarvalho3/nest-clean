import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { NewAnswerCommentEvent } from "@/domain/forum/enterprise/events/new-answer-comment-event";

export class OnNewAnswerComment implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerCommentNotification.bind(this),
      NewAnswerCommentEvent.name,
    );
  }

  private async sendNewAnswerCommentNotification({
    answerComment,
    answerId,
  }: NewAnswerCommentEvent) {
    const answer = await this.answersRepository.findById(answerId.toString());

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Novo comentário na sua resposta da pergunta "${answer.excerpt}"`,
        content: answerComment.content.substring(0, 40).concat("..."),
      });
    }
  }
}
