import R from 'ramda';
import eventEmitter from 'events';

class Musics extends eventEmitter {
  id = 0;
  songs = [];
  playingId;

  load(querys) {
    if (R.isEmpty(querys)) return this.songs;
    const allQuerys = R.keys(querys);
    const filtered = allQuerys.map(res => R.intersection(this.songs, this.filter(querys[res], res)));
    return filtered;
  }

  filter(count, query) {
    const match = {
      top: 'rating',
      topPlayed: 'playCount',
      recent: 'year',
    }
    const list = [...this.load('')];
    const filterTag = match[query];
    const getFilter = (a, b) => b[filterTag] - a[filterTag];
    const sorting = R.compose(R.take(count), R.sort(getFilter));
    return sorting(list);
  }

  getRandomSong(list) {
    return list[(Math.floor(Math.random() * 42) % list.length)];
  }

  play() {
    const playlist = [...this.load('')];
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
    const newSong = { id: (this.id += 1), ...finalSong, playCount: 0, dateAdded: String(new Date()) };
    this.songs.push(newSong);
    return (newSong);
  }
}

export default Musics;
