/**
 * 인덱스드 엑세스 타입
 */

// interface Post {
//   title: string;
//   content: string;
//   author: {
//     id: number;
//     name: string;
//     content: string;
//     age: number;
//   };
// }

type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    content: string;
    age: number;
  };
}[];

function printAuthorInfo(author: PostList[number]['author']) {
  console.log(`${author.name}-${author.id}`);
}

const post: PostList[number] = {
  title: '제목',
  content: '내용',
  author: {
    id: 1,
    name: '쓸맘',
    content: '내용,',
    age: 40,
  },
};

printAuthorInfo(post.author);

type Tup = [number, string, boolean];

type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];
type TupNum = Tup[number];
