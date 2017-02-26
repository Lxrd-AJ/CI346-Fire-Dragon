import { FirePage } from './app.po';

describe('fire App', function() {
  let page: FirePage;

  beforeEach(() => {
    page = new FirePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
