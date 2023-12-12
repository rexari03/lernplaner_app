# Copyright (C) 2023, NG:ITL
import versioneer
from pathlib import Path
from setuptools import find_packages, setup


def read(fname):
    return open(Path(__file__).parent / fname).read()


setup(
    name="lernplaner_app",
    version=versioneer.get_version(),
    cmdclass=versioneer.get_cmdclass(),
    author="FIAN22",
    author_email="calvinteuber7@gmail.com",
    description="App to track the learning progress of students",
    license="GPL 3.0",
    keywords="learning",
    url="https://github.com/rexari03/lernplaner_app",
    packages=find_packages(),
    long_description=read("README.md"),
    install_requires=[""],
)
