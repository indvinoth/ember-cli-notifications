import Ember from 'ember';
import layout from '../templates/components/notification-message';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['c-notification'],
  classNameBindings: [
    'processedType',
    'notification.dismiss::c-notification--in',
    'notification.onClick:c-notification--clickable'
  ],

  paused: false,

  // Set the correct close icon depending on chosen icon font
  closeIcon: Ember.computed('icons', function() {
    if (this.get('icons') === 'bootstrap') return 'glyphicon glyphicon-remove';

    return 'remove icon';
  }),

  // Set icon depending on notification type
  notificationIcon: Ember.computed('notification.type', 'icons', function() {
    const icons = this.get('icons');

    if (icons === 'bootstrap') {
      switch (this.get('notification.type')){
        case "info":
          return 'glyphicon glyphicon-info-sign';
        case "success":
          return 'glyphicon glyphicon-ok-sign';
        case "warning":
        case "error":
          return 'glyphicon glyphicon-exclamation-sign';
      }
    }

    switch (this.get('notification.type')){
      case "info":
        return 'info icon';
      case "success":
        return 'checkmark icon';
      case "warning":
        return 'warning icon';
      case "error":
        return 'warning circle icon';
    }
  }),

  mouseDown() {
    if (this.get('notification.onClick')) {
      this.get('notification.onClick')(this.get('notification'));
    }
  },
  mouseEnter() {
    if (this.get('notification.autoClear')) {
      this.set('paused', true);
      this.notifications.pauseAutoClear(this.get('notification'));
    }
  },

  mouseLeave() {
    if (this.get('notification.autoClear')) {
      this.set('paused', false);
      this.notifications.setupAutoClear(this.get('notification'));
    }
  },

  processedType: Ember.computed('notification.type', function() {
    if (this.get('notification.type') && Ember.A(['info', 'success', 'warning', 'error']).contains(this.get('notification.type'))) {
      return `c-notification--${this.get('notification.type')}`;
    }
  }),

  // Apply the clear animation duration rule inline
  notificationClearDuration: Ember.computed('paused', 'notification.clearDuration', function() {
    const duration = Ember.Handlebars.Utils.escapeExpression(this.get('notification.clearDuration'));
    const playState = this.get('paused') ? 'paused' : 'running';
    return Ember.String.htmlSafe(`animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms; animation-play-state: ${playState}; -webkit-animation-play-state: ${playState}`);
  }),

  actions: {
    removeNotification() {
      this.notifications.removeNotification(this.get('notification'));
    }
  }
});
