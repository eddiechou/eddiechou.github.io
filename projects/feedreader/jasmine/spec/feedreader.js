/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Completed: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        for(var feed = 0, len = allFeeds.length; feed < len; feed++) {
            testFeedURL(allFeeds[feed]);
        }

        function testFeedURL(feed) {
            it('feed has URL', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        }

        /* Completed: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        for(var feed = 0, len = allFeeds.length; feed < len; feed++) {
             testFeedName(allFeeds[feed]);
        }

        function testFeedName(feed) {
            it('feed has name', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        }
    });


    /* Completed: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Completed: Write a test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

        /* Completed: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * checks two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('visibility is toggled when the menu icon is clicked', function() {

            menuIcon = $('.menu-icon-link');

            // When clicked, the menu should show, so body should not have class 'menu-hidden' any more
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // When clicked again, the menu should disappear, so body should have class 'menu-hidden'
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* Completed: Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Completed: Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contains at least a single .entry element within the .feed container', function(done) {
            var feed = $('.feed');
            var entries = $(feed.find('.entry'));
            expect(entries.length).not.toBe(0);
            done();
        });

    });

    /* Completed: Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var header;
        var title;

        beforeEach(function(done) {
            // Initialize
            loadFeed(0, function() {
                // Get current header-title to compare
                header = $('.header-title').html();
                // Get feed entry title to compare
                title = $('.feed .entry h2').html();
                // Call loadFeed again
                loadFeed(1, done);
            });
        });

        /* Completed: Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('when loaded, the content actually changes', function(done){
            expect($('.header-title').html()).not.toBe(header);
            expect($('.feed .entry h2').html()).not.toBe(title);
            done();
        });
    });
}());