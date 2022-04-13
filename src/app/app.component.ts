import { PollService } from './poll-service/poll.service';
import { Component } from '@angular/core';
import { Poll } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false
  activePoll: Poll = null
  constructor(private ps: PollService) {}

  polls = this.ps.getPolls()

  setActivePoll(poll: Poll) {
    this.activePoll = null

    setTimeout(() => {
      this.activePoll = poll
    }, 100)
  }
}
