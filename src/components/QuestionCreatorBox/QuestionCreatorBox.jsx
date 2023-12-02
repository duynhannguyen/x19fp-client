import { useState, createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import parser from 'html-react-parser';
import { Button, Col, Divider, Row, message } from 'antd';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import MultipleChoiceCreator from '~/components/MultipleChoiceCreator';
import QuestionTypeSelector from './_QuestionTypeSelector';
import CheckboxCreator from '~/components/CheckboxCreator';
import EsayCreator from '../EsayCreator';
import { QUESTION_TYPE } from '~/utils/constants';
import QuestionAPI from '~/services/questionAPI';
import SubjectSelector from './_SubjectSelector';
import CollectionSelector from './_CollectionSelector';

export const CreateQuestionContext = createContext();

const initialAnswers = Array.from({ length: 4 }, () => ({
  id: uuidv4(),
  content: '',
  isCorrect: false
}));

const QuestionCreatorBox = () => {
  const [questionType, setQuestionType] = useState(QUESTION_TYPE.CHOICE);
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState('');
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState([]);
  const [isCorrectRequired, setIsCorrectRequired] = useState(false);
  const [isSubjectRequired, setIsSubjectRequired] = useState(false);
  const [isShowingError, setIsShowingError] = useState(false);
  const navigate = useNavigate();

  const onAnswerInputChange = (idChange, value) => {
    const newAnswers = answers.map(answer =>
      answer.id === idChange ? { ...answer, content: value } : answer
    );
    setAnswers(newAnswers);
  };

  const handleCreateMultipleChoice = async () => {
    const isValid = handleValidate();
    if (!isValid) {
      setIsShowingError(true);
      return;
    }
    const reqBody = {
      topic,
      answers,
      subject,
      type: questionType
    };
    try {
      const res = await QuestionAPI.createMultipleChoice(reqBody);
      navigate(`/question/${res.data.id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleValidate = () => {
    const errorFields = answers
      .filter(answer => !answer.content || parser(answer.content) === '')
      .map(answer => answer.id);
    if (!topic || parser(topic) === '') errorFields.push('topic');

    const correctAnswer = answers.find(answer => answer.isCorrect);
    if (!correctAnswer) {
      message.error('Chưa chọn đáp án đúng');
      setIsCorrectRequired(true);
    }
    if (!subject) {
      message.error('Chưa chọn môn');
      setIsSubjectRequired(true);
    }
    if (errorFields.length > 0) setErrors(errorFields);
    return errorFields.length === 0 && correctAnswer && subject;
  };

  const handleRefreshField = fieldName => {
    const errorFields = errors.filter(field => field !== fieldName);
    setErrors(errorFields);
    setIsCorrectRequired(false);
  };

  const handleDeleteAnswer = answerId => {
    const newFields = answers.filter(answer => answer.id !== answerId);
    setAnswers(newFields);
  };

  const handleSetCorrect = answerId => {
    const newFields = answers.map(answer =>
      answer.id === answerId ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false }
    );
    setAnswers(newFields);
    setIsCorrectRequired(false);
  };

  const handleChangeSubject = value => {
    setSubject(value);
    if (isSubjectRequired) setIsSubjectRequired(false);
  };

  const handleResetAll = () => {
    setIsCorrectRequired(false);
    setIsSubjectRequired(false);
    setErrors([]);
    setIsShowingError(false);
  };

  const MainSection = useMemo(() => {
    if (questionType === QUESTION_TYPE.CHOICE) return MultipleChoiceCreator;
    if (questionType === QUESTION_TYPE.CHECK) return CheckboxCreator;
    if (questionType === QUESTION_TYPE.ESSAY) return EsayCreator;
  }, [questionType]);

  return (
    <CreateQuestionContext.Provider
      value={{
        questionType,
        subject,
        topic,
        answers,
        errors,
        isCorrectRequired,
        isSubjectRequired,
        handleChangeType: value => setQuestionType(value),
        handleChangeSubject,
        onAnswerInputChange,
        onTopicInputChange: value => setTopic(value),
        handleCreateMultipleChoice,
        handleRefreshField,
        handleDeleteAnswer,
        handleSetCorrect
      }}
    >
      <BlockSectionWrapper className='h-auto'>
        <Row gutter={16} className='p-4'>
          <Col span={18} className='flex flex-col gap-8'>
            <MainSection />
          </Col>
          <Col span={6} className='flex flex-col gap-2'>
            <QuestionTypeSelector />
            <SubjectSelector />
            <Divider />
            <CollectionSelector />
            <Button type='primary' className='w-full h-[56px]' onClick={handleCreateMultipleChoice}>
              Lưu
            </Button>
            {isShowingError && (
              <Button className='w-full h-[56px]' onClick={handleResetAll}>
                Trở về
              </Button>
            )}
          </Col>
        </Row>
      </BlockSectionWrapper>
    </CreateQuestionContext.Provider>
  );
};

export default QuestionCreatorBox;
