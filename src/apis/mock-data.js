export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Nhóm 8',
    description: 'Pro MERN stack Course',
    type: 'public',
    columns: [
      {
        _id: 'id-01',
        userId: '3',
        questions: 'Ngày hôm qua thứ mấy?',
        likes: 15,
        answers: [
          { adminId: '1', answer: 'Là 15/08/2024', userName: 'Admin01' },
          { adminId: '2', answer: 'Là 15/08/2024', userName: 'Admin02' }
        ]
      },
      {
        _id: 'id-02',
        userId: '3',
        questions: 'Arcade 2 khi nào ra mắt?',
        likes: 5,
        answers: []
      },
      {
        _id: 'id-03',
        userId: '3',
        questions: 'Còn bao nhiêu tín chỉ để tốt nghiệp?',
        likes: 10,
        answers: []
      },
      {
        _id: 'id-04',
        userId: '3',
        questions: 'Liệu có đủ thời gian hoàn thành bài test không?',
        likes: 20,
        answers: []
      },
      {
        _id: 'id-05',
        userId: '3',
        questions: 'Không biết có được pass môn này điểm cao không?',
        likes: 0,
        answers: []
      }
    ]
  },
  users: [
    { id: '1', name: 'admin01', password: 'admin', userName: 'Admin01', role: 'admin' },
    { id: '2', name: 'admin02', password: 'admin', userName: 'Admin02', role: 'admin' },
    { id: '3', name: 'aloha', password: 'ABCXYZ', userName: 'Hoang Xuan', role: 'user' }
  ]
}
