import sys
import math
from pathlib import Path

# Add parent directories to path so we can import source module
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

import pytest
import source.shapes as shapes


class TestCircle:

    def setup_method(self, method):
        print(f"Setting up {method}...")
        self.circle = shapes.Circle(10)

    def teardown_method(method):
        print(f"Tearing down {method}...")

    def test_area(self):
        assert self.circle.area() == math.pi * self.circle.radius ** 2

    def test_perimeter(self):
        assert self.circle.perimeter() == 2 * math.pi * self.circle.radius

    def test_radius_attribute(self):
        assert self.circle.radius == 10
