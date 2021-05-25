# pixofarm_testing_task

Interview coding challenge (App side):

_1_ An app with a bottom tab bar (with two tabs).

_2_ The first tab which opens up to a map (google map) screen with the current position automatically located (access to GPS shall be granted by the user).

_3_ In the event of a tap on anywhere on the map, the selected (clicked) location coordinates (lat, lng) are saved and user is navigated to a camera page then (which has a capture button and a back button).

_4_ Using the capture button, user can take a picture which saves the image inside the gallery. “Image_uri”, “Current_date” and the previously saved “Coordinates” are saved into a database record (of your choice; e.g., realm, sqlite, …). Then user is navigated to the first screen (map) immediately (after each capture).

_5_ The second tab, which shows the results in a descending (taken_time-wise) order including a list of user’s capture history with:

            a small thumbnail of the taken image on each row followed by the date and the taken coordinates and a syncing button at the end of the row.

            (The syncing button activates a syncing process related to the selected row. image file & coordinates field have to be uploaded using the following url in a restApi format.

            url: https://this.is.a.test/

            * This is merely a test on how rest api call is handled. No actual uploading or response handling needed) à [OPTIONAL FOR EXTRA POINTS]

_6_ On the results page, with the coordinates you have, you can also get today’s temperature using a weather api of your choice (we introduce weatherbit.io , and show it on each list row instead of the coordinates themselves.

NOTES:

•      A step _0_ can be defined to design a login page where authentication is needed from the user à [OPTIONAL FOR EXTRA POINTS]

•      Instead of a database, you can simply use app states. using a database earns more points though à [OPTIONAL FOR EXTRA POINTS]

•      preferably use a valid api key for all needed third-party api calls.

•      Must-use:

            react-navigation

            react-native-camera

            state managers (preferably redux and its side effect managers: thunk, saga, …)
