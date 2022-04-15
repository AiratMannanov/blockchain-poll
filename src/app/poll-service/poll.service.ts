import { Web3Service } from './../blockchain/web3.service';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Poll, PollForm, PollVote } from '../types';
import { fromAscii, toAscii } from 'web3-utils'

@Injectable({
  providedIn: 'root'
})
export class PollService {
  constructor(private web3: Web3Service) { }

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = []
    const totalPolls = await this.web3.call('getTotalPolls')
    const acc = await this.web3.getAccount()
    const voter = await this.web3.call('getVoter', acc)
    const voterNormalized = this.normalizeVoter(voter)

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i)
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized)
      polls.push(pollNormalized)
    }
    return polls;
  }

  vote(payload: PollVote) {
    this.web3.executeTransaction('vote', payload.id, payload.vote)
  }

  createPoll(payload: PollForm) {
    const { question, thumbnail, options } = payload
    this.web3.executeTransaction('createPoll', question, thumbnail, options.map((op) => fromAscii(op)))
  }

  private normalizeVoter(voter: any) {
    return {
      id: voter[0],
      votedIds: voter[1].map((vote: any) => parseInt(vote))
    }
  }

  private normalizePoll(pollRaw: any, voter: any): Poll {
    return {
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      thumbnail: pollRaw[2],
      results: pollRaw[3].map((result: string) => parseInt(result)),
      options: pollRaw[4].map((op: any) => toAscii(op)),
      voted: voter.votedIds.length && voter.votedIds.find((votedId: number) => votedId === parseInt(pollRaw[0])) !== undefined
    }
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
