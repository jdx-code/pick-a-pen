const moment = require('moment')

module.exports = {

    formatDate: function (date, format) {
        return moment(date).format(format)
    },

    truncate: function(str, len) {
    if(str.length > len && str.length > 0) {
        let new_str = str + ' ';
        new_str = str.substr(0, len);
        new_str = str.substr(0, new_str.lastIndexOf(' '));
        new_str = new_str.length > 0 ? new_str : str.substr(0, len);
        return new_str + '...';
    }
    return str;
    }, 

    stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
    },    

    editIcon: function (storyUser, loggedUser, storyId, floating = true) {

      console.log('storyUser:', storyUser);       // Returns the whole story object
      console.log('storyUserId:', storyUser._id)  // Returns new ObjectId with Userid of the story
      console.log('loggedUser:', loggedUser);     // Returns an object with id of the logged in user
      console.log('storyId:', storyId);           // Returns new Object with id of the story
      
        if (storyUser._id.toString() === loggedUser.id) {
        // if (storyUser._id.toString() === '6446244fe35c91b6f5019224') {          
          if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
      },
}