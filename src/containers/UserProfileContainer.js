import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import UserProfile from 'components/userprofile/UserProfile';
import {
  profileEdit, getCitiesList,
} from 'actions/profileEditAction';
import {
  listDisciplineFilters,
} from 'actions/filterAction';

const validate = (values) => {
  const errors = {};
  if (!values.name || values.name.length < 2) {
    errors.name = 'Insira um nome';
  }

  if (values.userState !== 'NaN' && values.userCity === '0') {
    errors.userCity = 'Selecione a cidade';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state.session.session;

  return ({
    initialValues: {
      name: user.name,
      about: user.about,
      userState: user.city ? user.city.uf : null,
      userCity: user.city ? user.city.id : null,
      disciplines: [{ id: 16, name: 'Arte', slug: 'Art' }], // user.disciplines
    },
    user,
    stateList: state.profileEdit.stateList,
    isFetchingStatesList: state.profileEdit.isFetchingStatesList,
    cityList: state.profileEdit.cityList,
    disciplineFilters: state.filter.disciplineFilters,
  });
};

const mapDispatchToProps = dispatch => ({
  getCitiesList: (idState, autoLoad) => dispatch(getCitiesList(idState, autoLoad)),
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),

  onSubmit: (values) => {
    const profile = {
      name: values.name,
      about: values.about,
      city: values.userCity !== '0' ? values.userCity : null,
      profile_pic: values.profile_pic ? values.profile_pic : null,
      disciplines: values.disciplines.map(discipline => discipline.id),
    };
    return dispatch(profileEdit(profile));
  },
});

const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'profile',
  validate,
})(UserProfile));

export default UserProfileContainer;
