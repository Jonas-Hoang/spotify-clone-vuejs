import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import HomeView from "../views/HomeView.vue";
// @ts-ignore
import SearchView from "../views/SeachView.vue";
// @ts-ignore
import LibraryView from "../views/LibraryView.vue";
// @ts-ignore
import CreatePlaylist from "../views/CreateView.vue";
// @ts-ignore
import LikeSong from "../views/LikeSong.vue";
// @ts-ignore
import Playlist1 from "../views/Playlist1.vue";
// @ts-ignore
import Playlist2 from "../views/Playlist2.vue";
// @ts-ignore
import Playlist3 from "../views/Playlist3.vue";
// @ts-ignore
import Playlist4 from "../views/Playlist4.vue";

const router = createRouter({
    // @ts-ignore
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            component: HomeView,
        },
        {
            path: "/search",
            component: SearchView,
        },
        {
            path: "/library",
            component: LibraryView,
        },
        {
            path: "/create",
            component: CreatePlaylist,
        },
        {
            path: "/liked",
            component: LikeSong,
        },
        {
            path: "/pl1",
            component: Playlist1,
        },
        {
            path: "/pl2",
            component: Playlist2,
        },
        {
            path: "/pl3",
            component: Playlist3,
        },
        {
            path: "/pl4",
            component: Playlist4,
        },
    ],
});

export default router;