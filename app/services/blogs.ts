const blogs = [
  {
    id: 1,
    title: 'first blog',
    author: 'first author',
    url: 'firstUrl.com',
    likes: 1,
  },
  {
    id: 2,
    title: 'second blog',
    author: 'second author',
    url: 'secondurl.com',
    likes: 2,
  },
  {
    id: 3,
    title: 'third blog',
    author: 'third author',
    url: 'thirdurl.com',
    likes: 3,
  },
];

let nextId = 4;

export const getBlogs = () => {
  return [...blogs].sort((a, b) => b.likes - a.likes);
};

export const getOneBlog = (id: string) => {
  return blogs.find((blog) => {
    return blog.id === Number(id);
  });
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};

export const likeBlog = (id: number) => {
  const blogToUpdate = blogs.find((blog) => blog.id === id);

  if (blogToUpdate) {
    blogToUpdate.likes += 1;
  }
};

export const filterBlogs = (filter: string) => {
  return blogs.filter((blog) => {
    return blog.title.includes(filter);
  });
};
