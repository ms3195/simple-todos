import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './employee.html';

Template.employee.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.employee.events({
  'click .toggle-checked'() {
    // Set up the checked property to the opposite of its current value
    Meteor.call('employees.setChecked', this._id, !this.checked);
  },
  'click .delete'() { // makes employee deletable
    Meteor.call('employees.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('employees.setPrivate', this._id, !this.private);
  },
});
