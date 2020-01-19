import { mount, createLocalVue, config } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Breadcrumb from '@/components/Breadcrumb/index.vue';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
config.methods['$t'] = () => {};
config.methods['$te'] = () => {};

const routes = [
  {
    path: '/',
    name: 'home',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

describe('Breadcrumb.vue', () => {
  const wrapper = mount(Breadcrumb, {
    localVue,
    router
  })
  it('dashboard', () => {
    router.push('/dashboard')
    const len = wrapper.findAll('.el-breadcrumb__inner').length
    expect(len).toBe(1)
  })
  // it('click link', () => {
  //   router.push('/menu/menu1/menu1-2/menu1-2-2')
  //   const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
  //   const second = breadcrumbArray.at(1)
  //   console.log(breadcrumbArray)
  //   const href = second.find('a').attributes().href
  //   expect(href).toBe('#/menu/menu1')
  // })
  // it('noRedirect', () => {
  //   router.push('/menu/menu1/menu1-2/menu1-2-1')
  //   const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
  //   const redirectBreadcrumb = breadcrumbArray.at(2)
  //   expect(redirectBreadcrumb.contains('a')).toBe(false)
  // })
  // it('last breadcrumb', () => {
  //   router.push('/menu/menu1/menu1-2/menu1-2-1')
  //   const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
  //   const redirectBreadcrumb = breadcrumbArray.at(3)
  //   expect(redirectBreadcrumb.contains('a')).toBe(false)
  // })
})
