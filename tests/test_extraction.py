
import unittest
from unittest.mock import MagicMock, patch
from src.extractor import extract_tables_from_pdf

class TestExtractor(unittest.TestCase):

    @patch('src.extractor.pdfplumber.open')
    def test_extract_tables_success(self, mock_pdf_open):
        # Mock PDF pages
        mock_page = MagicMock()
        mock_page.extract_tables.return_value = [[['Header', 'Col2'], ['Row1', 'Data1']]]
        
        mock_pdf = MagicMock()
        mock_pdf.pages = [mock_page]
        mock_pdf_open.return_value.__enter__.return_value = mock_pdf

        result = extract_tables_from_pdf('dummy.pdf')
        
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['page'], 1)
        self.assertEqual(result[0]['index_on_page'], 1)
        self.assertEqual(result[0]['table'][0][0], 'Header')

    @patch('src.extractor.pdfplumber.open')
    def test_extract_no_tables(self, mock_pdf_open):
        mock_page = MagicMock()
        mock_page.extract_tables.return_value = []
        
        mock_pdf = MagicMock()
        mock_pdf.pages = [mock_page]
        mock_pdf_open.return_value.__enter__.return_value = mock_pdf

        result = extract_tables_from_pdf('dummy.pdf')
        
        self.assertEqual(len(result), 0)

if __name__ == '__main__':
    unittest.main()
