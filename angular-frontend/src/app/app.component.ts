import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  HelloWorldGQL,
  SomethingHappenedGQL,
  TriggerSubscriptionGQL,
  UploadFileGQL
} from "../libs/graphql-client/__generated__/graphql";
import {take} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public receivedSubscriptionMessages: number = 0;

  constructor(
    private helloWorldGQL: HelloWorldGQL,
    private trigger: TriggerSubscriptionGQL,
    private somethingHappenedGQL: SomethingHappenedGQL,
    private uploadFileGQL: UploadFileGQL
  ) {
    this.helloWorldGQL.fetch().pipe(
      take(1)
    ).subscribe((response) => {
      console.log(response.data.hello);
    });
    this.somethingHappenedGQL.subscribe().pipe(
      untilDestroyed(this)
    ).subscribe((response) => {
      this.receivedSubscriptionMessages++;
    });
  }

  triggerSubscription() {
    this.trigger.mutate({message: "Hello"}).pipe(
      take(1)
    ).subscribe();
  }

  selectFile($event: Event) {
    const fileInput = $event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.uploadFileGQL.mutate({file}).pipe(
        take(1)
      ).subscribe();
    }
  }
}
