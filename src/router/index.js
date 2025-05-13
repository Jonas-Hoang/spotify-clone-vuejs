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
    ],
});

export default router;