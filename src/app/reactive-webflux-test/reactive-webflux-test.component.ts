import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reactive-webflux-test',
  templateUrl: './reactive-webflux-test.component.html',
  styleUrls: ['./reactive-webflux-test.component.css']
})
export class ReactiveWebfluxTestComponent implements OnInit, OnDestroy {

  people = {};
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPeople();
  }
  getPeople() {
    const sub = this.observeMessages(environment.url).subscribe(person => {
      const newPerson = JSON.parse(person);
      this.people[newPerson.id] = newPerson.name;
    });
    this.subscriptions.push(sub);
  }

  observeMessages(url: string): Observable<string> {
    return new Observable<string>(obs => {
      const stream = new EventSource(url);
      stream.addEventListener('message', (evt) => {
        obs.next(evt.data);
      });
      return () => stream.close();
    });
  }

  createPerson(input) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const person = new Person(input.value);
    this.http.post(environment.url, JSON.stringify(person), { headers: headers }
    ).subscribe(personResponse => {
      alert('Person created');
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

class Person {

  id: number;
  name: string;

  constructor(name: string, id?: number) {
    this.id = id || null;
    this.name = name;
  }
}
