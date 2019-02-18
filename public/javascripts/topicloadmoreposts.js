
const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
const lastcharacter = url[url.length-1];
if (lastcharacter === '/'){
    url = url.substring(0, url.length-1);
}
let topicid = url.substring(url.lastIndexOf('/') + 1);
let count = document.getElementsByClassName('list-item').length;
let total = Number(document.getElementById('postscount').innerText);
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.post67.com.dev/api/topics/${topicid}` : `https://www.post67.com/api/topics/${topicid}`;


document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result = result.results;
                result.forEach(post => {
                    const div = document.createElement('div');
                    div.classList.add("post-review");
                    div.classList.add("list-item");
                    div.classList.add("mb-50");
                    const div2 = document.createElement('div');
                    div2.classList.add("mb-15");
                    const link = document.createElement('a');
                    link.setAttribute("href", `/posts/${post.id}`);
                    link.innerText = post.name;
                    link.classList.add("bold");
                    div2.appendChild(link);
                    div.appendChild(div2);
                    const div3 = document.createElement('div');
                    div3.classList.add("mb-15");
                    div3.innerText = post.description;
                    div.appendChild(div3);
                    const div4 = document.createElement('div');
                    div4.classList.add("flex");
                    div.appendChild(div4);
                    const div5 = document.createElement('div');
                    div5.classList.add("mr-15");
                    div4.appendChild(div5);
                    l1 = document.createElement('a');
                    l1.setAttribute("href", `/users/${post.userid}`);
                    i1 = document.createElement('img');
                    i1.setAttribute("src", post.userimageurl);
                    i1.classList.add('width-60');
                    i1.classList.add('height-60');
                    i1.classList.add('border-radius');
                    l1.appendChild(i1);
                    div5.appendChild(l1);
                    div6 = document.createElement('div');
                    div4.appendChild(div6);
                    const div7 = document.createElement('div');
                    l2 = document.createElement('a');
                    l2.setAttribute("href", `/users/${post.userid}`);
                    l2.innerText = post.username;
                    l2.classList.add("bold");
                    l2.classList.add("fs-16");
                    l2.classList.add("marginr-5");
                    l3 = document.createElement('a');
                    l3.setAttribute("href", `/topics/${post.topicid}`);
                    l3.innerText = post.topicname;
                    l3.classList.add("bold");
                    l3.classList.add("fs-16");
                    div7.appendChild(l2);
                    div7.appendChild(l3);
                    div6.appendChild(div7);
                    const div8 = document.createElement('div');
                    div8.innerText = moment(post.datecreated).format('LLL');
                    div8.classList.add("fs-16");
                    div6.appendChild(div8);
                    container.appendChild(div);
                });
                count = document.getElementsByClassName('list-item').length;
                skip = count;
                loading = false;
            });
        }
    }
});
