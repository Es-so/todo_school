import R from 'ramda';
import eventEmitter from 'events';

class Musics extends eventEmitter {
  id = 0;
  songs = [
/*test*/{
      id: 0,
      title: 'Du fond du coeur',
      artist: 'Rohff',
      genre: 'Rap',
      album: 'Code de l\'honneur',
      rating: 10,
      playCount: 4,
    }
  ];
  playingId;

  filteredSongs (query) {
    const songs = this.songs;
    const filter = R.keys(query).pop();
    const getFilter = (a, b) => b.rating - a.rating; // test for rating only, not generic.
    const sorting = R.sort(getFilter);
    const matchedSongs = R.take(Number(query[filter]), sorting(songs));
    const filtered = matchedSongs;
    return filtered;
  }

  load() {
    return this.songs;
  }

  getRandomSong(list) {
    return list[(Math.floor(Math.random() * 42)% list.length)];
  }


  play() {
    const playlist = [ ...this.load() ];

    const playSong = list => {
    
    const randomSong = this.getRandomSong(list);
    randomSong.playCount += 1;
    console.log(`Playing song: ${randomSong.title}...`);
    
    this.playingId = setTimeout(() => {
      if (!playlist.length) return;
      playSong(list.filter(song => song.id !== randomSong.id));
      }, randomSong.time * 1000);
    }
    playSong(playlist);
  }

  stop() {
    if (!this.playingId) return;
    clearTimeout(this.playingId);
    console.log('player stopped...');
  }

  add(song) {
    const {
      title,
      genre,
      artist,
      album,
      time,
      year,
      rating,
    } = song;
    const finalSong = {
      title,
      genre,
      artist,
      album,
      time: Number(time),
      year,
      rating,
    };
    const newSong =  { id: (this.id += 1), ...finalSong, dateAdded: String(new Date()) };
    this.songs.push(newSong);
    return (newSong);
  }
}

export default Musics;


// Examples:

//title,genre,artist,album,time,year,rating

// id
// title: String
// artist: String
// genre: String
// album: String
// time: number of seconds
// year: Integer
// rating: number
// playCount: integer
// dateAdded: Date


// { "title": "generation sacrifie", "genre": "Rap", "artist": "Rohff", "album": "code de l'honneur", "time": "8","year": "2001", "rating": "10" }