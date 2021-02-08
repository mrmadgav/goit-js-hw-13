let baseUrl = 'https://pixabay.com/api/';
export default {
  page: 1,
  query: '',
  key: '20202881-652c2a411aa551237b4134ad2',
  async fetchImg() {
    let endUrl = `?image_type=photo&orientation=horizontal&q=${this.content}&page=${this.page}&per_page=12&key=${this.key}`;
    try {
      let response = await fetch(baseUrl + endUrl);
      let item = await response.json();
      // console.log(item);
      this.increment();
      return item.hits;
    } catch (error) {
      return console.log(error);
    }
  },

  get searchValue() {
    return this.content;
  },
  set searchValue(string) {
    this.content = string;
  },
  increment() {
    this.page += 1;
  },
  home() {
    this.page = 1;
  },
};
