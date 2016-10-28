using System;
using System.Threading;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;

namespace PatternLabSelenium.Tests
{
    /// <summary>
    /// Tests Process 1 Page functionality
    /// This is an example for Selenium tests setup, and is not a complete set of tests for Process 1
    /// </summary>
    [TestClass]
    public class TestProcessPage : TestBase
    {
        private static IWebElement _title;
        private static IWebElement _nextBtn;
        
        /// <summary>
        /// Delegates the test's implementation to helper method to run in all browsers
        /// </summary>
        [TestMethod]
        public void ModalNavigationTest()
        {
            RunTestInBrowsers(ModalNavigationTestImpl);
        }

        /// <summary>
        /// ModalNavigationTest implementation. Is called from RunTestInBrowsers from TestBase class
        /// </summary>
        /// <param name="driver">driver to run tests with</param>
        public void ModalNavigationTestImpl(IWebDriver driver)
        {
            try
            {
                NavigateToTestPage(driver);

                //Given
                TestElementsOnPage(driver);
                string titleFirstCard = "Gi og fjerne rettigheter (1)";
                string titleSecondCard = "Gi og fjerne rettigheter (2)";
                Thread.Sleep(1000);
                Assert.IsTrue(_title.Text.Equals(titleFirstCard), AssertionFailedErrorMessage(driver, _title.Text, titleFirstCard));

                //When
                _nextBtn.Click();

                Thread.Sleep(1000);
                ScreenshotCapture(driver, this.GetType().Name, GetCurrentMethod(), "5-NextBtnClick");

                //Then
                _title = driver.FindElement(By.CssSelector(".modal-content .modal-header .a-panel-heading-text h2"));

                Assert.IsTrue(_title.Text.Equals(titleSecondCard), AssertionFailedErrorMessage(driver, _title.Text, titleSecondCard));

                //Go back functionality
                IWebElement backBtn = driver.FindElement(By.ClassName("a-modal-back"));
                backBtn.Click();
                Thread.Sleep(1000);
                ScreenshotCapture(driver, this.GetType().Name, GetCurrentMethod(), "6-BackBtnClick");
                _title = driver.FindElement(By.CssSelector(".modal-content .modal-header .a-panel-heading-text h2"));

                Assert.IsTrue(_title.Text.Equals(titleFirstCard), AssertionFailedErrorMessage(driver, _title.Text, titleFirstCard));
            }
            catch (Exception ex)
            {
               TearDown();
               throw new Exception("Failed on driver: " + driver + " .", ex); 
            }
        }

        /// <summary>
        /// Part of test setup. Navigates to correct page that should be tested
        /// </summary>
        /// <param name="driver">currently running driver</param>
        private void NavigateToTestPage(IWebDriver driver)
        {
            driver.Navigate().GoToUrl("http://altinn.github.io/DesignSystem/patterns/04-sider-80-prosess-70-prosess/04-sider-80-prosess-70-prosess.html");
            Thread.Sleep(1000);
            ScreenshotCapture(driver, this.GetType().Name, GetCurrentMethod(), "4-PageLaunch");
        }

        private void TestElementsOnPage(IWebDriver driver)
        {
            IWebElement icon = driver.FindElement(By.CssSelector(".modal-content .modal-header .material-icons"));
            IWebElement modal = driver.FindElement(By.Id("modalExample"));
            _title = driver.FindElement(By.CssSelector(".modal-content .modal-header .a-panel-heading-text h2"));
            _nextBtn = driver.FindElement(By.CssSelector("[href*='../../patterns/04-sider-80-prosess-70-prosess-2/04-sider-80-prosess-70-prosess-2.html']"));
            
            // etc..
        }
    }
}
