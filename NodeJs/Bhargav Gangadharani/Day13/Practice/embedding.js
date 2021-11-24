const mongoose = require('mongoose');

const database = 'mongodb://localhost/playground';

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: {
  //   type: authorSchema,
  //   required: true
  // },

  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Radix';
  course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();

}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('Node Course', new Author({ name: 'Radix2' }));

// updateAuthor('_id');

// createCourse('Node Course', [
//   new Author({ name: 'Radix' }),
//   new Author({ name: 'Radix2' })
// ]);

// addAuthor('6191156e8517b9500ac7a52e', new Author({ name: 'radix' }))

// removeAuthor('courseid', 'authorid'); 