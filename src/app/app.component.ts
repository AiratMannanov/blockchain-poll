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

  polls: Poll[] = [
    {
      id: 1,
      question: 'Do you like cats or dogs?',
      thumbnail: 'https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip',
      options: ['cats', 'dogs', 'none'],
      results: [0, 5, 7],
      voted: true
    },
    {
      id: 2,
      question: 'Best month for summer holiday?',
      thumbnail: 'https://media.istockphoto.com/photos/couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island-picture-id1160947136?k=20&m=1160947136&s=612x612&w=0&h=TdExAS2--H3tHQv2tc5woAl7e0zioUVB5dbIz6At0I4=',
      options: ['Monday','Tuesday', 'Wednesday'],
      results: [1, 6, 4],
      voted: false
    },
  ]

  setActivePoll(poll: Poll) {
    this.activePoll = null

    setTimeout(() => {
      this.activePoll = poll
    }, 100)
  }
}
