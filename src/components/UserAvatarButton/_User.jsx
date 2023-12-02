import { Badge, Button, Divider } from 'antd';
import { FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoGameControllerOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-y-4 items-start'>
      <Button type='text' className='w-full text-left' onClick={() => navigate('/question/mine')}>
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <div className='flex items-center gap-3'>
            <RiQuestionAnswerLine className='text-base' />
            <span className='pr-3'>Kho câu hỏi/bài tập</span>
          </div>
        </Badge>
      </Button>
      <Button
        type='text'
        className='w-full text-left'
        onClick={() => navigate(`/u/${currentUser?._id}/question`)}
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <div className='flex items-center gap-3'>
            <FileTextOutlined className='text-base' />
            <span className='pr-3'>Kho đề thi/kiểm tra</span>
          </div>
        </Badge>
      </Button>
      <Button
        type='text'
        className='w-full text-left'
        onClick={() => navigate(`/u/${currentUser?._id}/question`)}
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <div className='flex items-center gap-3'>
            <IoGameControllerOutline className='text-base' />
            <span className='pr-3'>Kho game</span>
          </div>
        </Badge>
      </Button>
      <Divider className='bg-slate-100/20 my-0' />
      <Button
        type='text'
        icon={<LogoutOutlined className='text-base' />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
        onClick={() => dispatch(logout())}
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default User;
